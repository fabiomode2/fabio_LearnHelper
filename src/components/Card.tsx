interface Props {
  title: string;
  img: string;
  text: string;
  onClick: () => void;
}

export const Card = ({ title, img, text, onClick }: Props) => {
  return (
    <>
      <div className="card col m-2 ">
        <img
          src={img}
          className="card-img-top rounded w-25 align-self-center "
          alt="..."
        />
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          {text && (
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                onClick();
              }}
            >
              {text}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
