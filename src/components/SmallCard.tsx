import { DataCard } from "./types";

interface Props {
  title: string;
  onClick: (type: string, data: DataCard) => void;
  data: DataCard;
  type: string;
}

export const SmallCard = ({ title, onClick, data, type }: Props) => {
  //style="width: 18rem;"
  return (
    <>
      <div className="card m-2">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <button
            className="btn btn-info"
            onClick={() => {
              onClick(type, data);
            }}
          >
            Ask me!
          </button>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
