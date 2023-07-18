import { useRouter } from "next/router";
import Seo from "../../components/Seo";
import Image from "next/image";
import { MdDateRange } from "react-icons/md";
import { BiSolidStar } from "react-icons/bi";

export default function Detail({ params }) {
  const router = useRouter();
  // 서버에서 불러옴
  const [title, id] = params || [];
  // 클라이언트에서 불러옴
  const { poster, date, rate } = router.query;
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
      <div className="movie_info">
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${poster}`}
            alt="movie_image"
            width="250"
            height="350"
          />
        </div>
        <div className="movie_detail">
          <div>
            <b>release</b>
            <span className="date">
              <MdDateRange />
            </span>
            <br />
            {date}
          </div>
          <div>
            <b>rate</b>
            <span className="star">
              <BiSolidStar />
            </span>
            <br />
            {rate}
          </div>
        </div>
      </div>
      <style jsx>{`
        h4 {
          font-size: 20px;
        }

        .movie_info {
          display: flex;
          flex-direction: column;
          padding: 30px;
          text-align: center;
        }

        .movie_detail {
          text-align: left;
          padding-left: 20px;
          margin-top: 20px;
          font-size: 20px;
        }

        .date {
          color: #fd7272;
        }

        .star {
          color: #fbc531;
        }
      `}</style>
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: { params },
  };
}
