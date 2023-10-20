import { formatDate } from '../utils/utils';

function TextArticle({ article }) {
  return (
    <article className="flex flex-col gap-3">
      <div>
        <p className="text-sm md:text-base text-gray-500">
          Published {formatDate(article.published)}
        </p>
        <p>{article.author}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-base md:text-xl font-bold"
        >
          {article.title}
        </a>
      </div>
    </article>
  );
}

export default TextArticle;
