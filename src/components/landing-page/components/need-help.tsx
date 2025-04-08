import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const NeedHelp = () => {
  return (
    <div
      className={
        "flex flex-row gap-2 items-center bg-primary-600 py-1 rounded-full px-1 cursor-pointer"
      }
    >
      <p className={"px-2 text-sm text-white"}>Need help?</p>
      <div
        className={
          "flex items-center justify-center bg-primary-300 w-9 h-9 rounded-full"
        }
      >
        <ChatBubbleIcon fontSize={"small"} sx={{ color: "white" }} />
      </div>
    </div>
  );
};
export default NeedHelp;
