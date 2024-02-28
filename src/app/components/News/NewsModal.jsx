import { useEffect } from "react";
import Modal from "react-modal";
import Close from "../../../../public/img/close.svg";
import Image from "next/image";

const NewsModal = ({ isOpen, onClose, data, formattedDescription }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      className="news-modal h-[906px] w-[288px] sm:w-[344px] md:w-[586px] xl:w-[740px] 2xl:w-[792px] flex flex-col "
      overlayClassName="news-overlay"
      onRequestClose={onClose}
      contentLabel="Детальна інформація про новину"
      ariaHideApp={false}
    >
      {" "}
      <button
        className="mb-2 self-end justify-end sm:mr-[-8px] md:mr-[1px] 2xl:mr-2"
        onClick={onClose}
      >
        <Close />
      </button>
      <div className="modal-content md:w-[529px] xl:w-[680px] xl:mr-[10px] sm:pr-[8px] xl:pr-[20px] 2xl:w-[725px] mr-auto custom-scrollbar [&::-webkit-scrollbar]:[width:6px] md:[&::-webkit-scrollbar]:[width:8px] xl:[&::-webkit-scrollbar]:[width:10px]">
        <Image
          src={data.image}
          alt="Photo of the news"
          width={696}
          height={315}
          className="mb-6 w-[256px] h-[175px] sm:h-[198px] sm:w-[288px] md:w-[506px] md:h-[336px] xl:h-[409px] xl:w-[660px] 2xl:w-[696px] 2xl:h-[386px] object-cover "
        />
        <span className="text-base sm:text-lg md:text-xl lg:text-lg mb-4">
          {data.date}
        </span>
        <h2 className="text-xl font-bold mb-3 md:max-w-[506px]">
          {data.title}
        </h2>

        <p
          className="lg:max-w-[660px] md:max-w-[506px]"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></p>
      </div>
    </Modal>
  );
};

export default NewsModal;
