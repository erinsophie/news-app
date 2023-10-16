import { formatDate } from '../utils/utils';

function TextArticle({ article }) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-gray-400">
          Published {formatDate(article.published)}
        </p>
        <p>{article.author}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-xl font-bold"
        >
          {article.title}
        </a>
      </div>
    </div>
  );
}

export default TextArticle;
