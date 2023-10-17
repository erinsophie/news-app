import { formatDate } from '../utils/utils';

function MediumArticle({ article }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex-1 max-h-[500px] md:max-w-[400px] md:min-w-[400px] overflow-hidden rounded-lg">
        <img
          src={article.image}
          alt="medium article image"
          className="object-cover w-full h-full"
        ></img>
      </div>
      <div>
        <p className="text-gray-400">
          Published {formatDate(article.published)}
        </p>
        <p>{article.author}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline font-bold"
        >
          {article.title}
        </a>
      </div>
    </div>
  );
}

export default MediumArticle;
