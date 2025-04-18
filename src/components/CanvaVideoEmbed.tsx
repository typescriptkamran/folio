// components/CanvaVideoEmbed.tsx
const CanvaVideoEmbed = () => {
    return (
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg">
        <iframe
          src="https://www.canva.com/design/DAGjxUXxCVQ/LLT9wLhl7bfCJAvqSPfVaQ/view?embed"
          className="absolute top-0 left-0 w-full h-full"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    );
  };
  
  export default CanvaVideoEmbed;
  