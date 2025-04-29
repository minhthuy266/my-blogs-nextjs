import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getTaxonomy } from "@lib/taxonomyParser";
import { humanize, markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
const { blog_folder } = config.settings;
import { getSinglePage } from "@lib/contentParser";
import { FaFolder } from "react-icons/fa";
import { slugify } from "@lib/utils/textConverter";
import Image from "next/image";

const Categories = ({ categories }) => {
  console.log("CCCC", categories);
  return (
    <Base title={"categories"}>
      <section className="section pt-0">
        {markdownify(
          "Categories",
          "h1",
          "h2 mb-16 bg-theme-light dark:bg-darkmode-theme-dark py-12 text-center lg:text-[55px]"
        )}
        <div className="container pt-12 text-center">
          <ul className="row">
            {categories.map((category, i) => (
              <li
                key={`category-${i}`}
                className="relative mt-4 block lg:col-4 xl:col-3"
              >
                <Link
                  href={`/categories/${category.name}`}
                  className="group relative flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg bg-theme-light px-4 py-4 font-bold text-lg text-gray-800 transition
    hover:bg-primary hover:text-white
    dark:bg-darkmode-theme-dark dark:text-primary dark:hover:text-white"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0 opacity-20 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={`/images/categories/${category.name}.jpg`}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text + Icon */}
                  <div className="z-10 flex items-center">
                    <FaFolder className="mr-1.5" />
                    {humanize(category.name.replace("-", " "))} ({category.posts})
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Base>
  );
};

export default Categories;

export const getStaticProps = () => {
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");
  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.map((e) => slugify(e)).includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
      image: `/images/categories/${category}.jpg`,
    };
  });
  return {
    props: {
      categories: categoriesWithPostsCount,
    },
  };
};
