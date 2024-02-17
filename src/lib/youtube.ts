import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";

export async function searchYoutube(searchQuery: string) {
  searchQuery = encodeURIComponent(searchQuery);

  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5`
  );

  if (!data) {
    console.log("youtube fail");
    return null;
  }

  if (data.items[0] == undefined) {
    console.log("youtube fail");
    return null;
  }

  return data.items[0].id.videoId;
}

export async function getTranscript(videoId: string) {
  // npm i youtube-transcript
  try {
    const transcript_arr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
      country: "EN",
    });

    let transcript = "";

    for (const t of transcript_arr) {
      transcript += `${t.text} `;
    }
    console.log("transcript");
    return transcript.replaceAll("\n", "");
  } catch (error) {
    return "";
  }
}

// export async function getQuestionFromTranscript(
//   transcript: string,
//   course_title: string
// ) {
//   type Question = {
//     question: string;
//     answer: string;
//     option1: string;
//     option2: string;
//     option3: string;
//   }[];
//   console.log("question");
//   const question: Question = await strict_output(
//     "you are an helpful AI thar is able to generate mcq question and answers, the length of each answer should not be more than 15 words",
//     new Array(5).fill(
//       `you are to generate a random hard mcq question about the ${course_title} with the context of the following transcript: ${transcript}`
//     ),
//     {
//       question: "question",
//       answer: "answer with max length of 15 words",
//       option1: "option2 with max length of 15 words",
//       option2: "option3 with max length of 15 words",
//       option3: "option4 with max length of 15 words",
//     }
//   );
//   console.log(question, "question");
//   return question;
// }
