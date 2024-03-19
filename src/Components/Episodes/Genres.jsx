import { formatGenres } from "../utils";

const Genres = ({ genres }) => {
  let formattedGenres;

  if (genres) {
    formattedGenres = formatGenres(genres);
  }
  return (
    <>
      {genres && (
        <div className="genres">
          {formattedGenres.map((genre) => {
            return (
              <p key={genre} className={genre.replaceAll(" ", "_") + " genre"}>
                {genre}
              </p>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Genres;
