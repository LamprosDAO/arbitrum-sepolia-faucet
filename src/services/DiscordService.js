import axios from "axios";

function DiscordService() {
  const Send = async (data) => {
    const body = {
      content: "",
      tts: false,
      color: "#00d4ff",
      embeds: [
        {
          title: "Faucet Claimed 🚰",
          description: data,
        },
      ],
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_DISCORD_WEBHOOK_URL,
        body
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    Send,
  };
}

export default DiscordService;
