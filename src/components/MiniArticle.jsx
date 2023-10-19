import { formatDate } from '../utils/utils';

function MiniArticle({ article }) {
  return (
    <div className="flex gap-3">
      <div className="min-h-[120px] max-h-[120px] max-w-[190px] min-w-[190px] overflow-hidden rounded-lg">
        <img
          src={article.image}
          alt="Placeholder for article content"
          className="object-cover w-full h-full"
        ></img>
      </div>
      <div>
        <p className="text-sm md:text-base text-gray-400">
          Published {formatDate(article.published)}
        </p>
        <p>{article.author}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline font-bold text-sm md:text-base"
        >
          {article.title}
        </a>
      </div>
    </div>
  );
}

export default MiniArticle;
