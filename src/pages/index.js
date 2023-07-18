import Image from "next/image";
import Seo from "../components/Seo";
import Link from "next/link";
import { useRouter } from "next/router";

const poster = {
  maxWidth: "100%",
  borderRadius: "12px",
  transition: "transform 0.2s ease-in-out",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
};

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title, poster, date, rate) => {
    router.push(
      {
        pathname: `/movies/${title}/${id}`,
        query: {
          poster,
          date,
          rate,
        },
      },
      `/movies/${title}/${id}`
    );
  };
  return (
    <div className="container">
      <Seo title="Home" />
      {/* movies state가 정의되지 않은 경우 */}
      {results?.map((movie) => (
        <div
          key={movie.id}
          onClick={() =>
            onClick(
              movie.id,
              movie.original_title,
              movie.poster_path,
              movie.release_date,
              movie.vote_average
            )
          }
          className="movie"
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="movie_image"
            width={160}
            height={210}
            style={poster}
          />
          <Link
            href={{
              pathname: `/movies/${movie.title}/${movie.id}`,
              query: {
                poster: movie.poster_path,
                date: movie.release_date,
                rate: movie.vote_average,
              },
            }}
            as={`/movies/${movie.original_title}/${movie.id}`}
            legacyBehavior
          >
            <h4>{movie.original_title}</h4>
          </Link>
          <div className="movie_info">
            <div>release {movie.release_date}</div>
            <div>rate {movie.vote_average}</div>
          </div>
        </div>
      ))}
      <style jsx>{`
        a {
          text-decoration: none;
        }
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }

        .movie {
          cursor: pointer;
          text-align: center;
        }

        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }

        .movie h4 {
          font-size: 15px;
          text-align: center;
        }

        .movie_info {
          text-align: left;
          padding: 10px;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.AUTH,
    },
  };

  const { results } = await (
    await fetch("http://localhost:3000/api/movies", options)
  ).json();

  return {
    props: { results },
  };
}
