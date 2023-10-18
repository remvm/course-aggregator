import { withLayout } from "@/layout/Layout";
import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from "axios";
import { MenuItem } from "@/interfaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "@/interfaces/page.interface";
import { ParsedUrlQuery } from "node:querystring";
import { ProductModel } from "@/interfaces/product.interface";
import { firstLevelMenu } from "@/helpers/helpers";
import { TopPageComponent } from "@/page-components";
import { API } from "@/helpers/api";
import Head from "next/head";
import { Error404 } from '../404';
import { usePageQuery, useProductQuery } from "@/hooks/useWrapperQuery";
import { useRouter } from "next/router";

function TopPage({ firstCategory, page }: TopPageProps): JSX.Element {
  const router = useRouter();
  const pageHook = usePageQuery(router.query.alias as string);
  const productsHook = useProductQuery(pageHook.data?.category || '');
  console.log(pageHook);
  if (pageHook.isError || productsHook.isError) {
    return <Error404 />;
  } else if (pageHook.isLoading || productsHook.isLoading) {
    return <div>Загрузка</div>;
  } else {
    
  return <>
    <Head>
      <title>{page.metaTitle}</title>
      <meta name="desccription" content={page.metaDescription} />
    </Head>
    <TopPageComponent 
      firstCategory={firstCategory}
      page={pageHook.data!}
      products={productsHook.data!}
    />
  </>;
}
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: m.id
    });
    paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)));
  }
  return {
      paths,
      fallback: true
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
        notFound: true
    };
  }

  const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
  if (!firstCategoryItem) {
    return {
        notFound: true
    };
  }

  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id
    });
    if (menu.length == 0) {
      return {
        notFound: true
      };
    }
    
    const { data: page } = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);
    const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
      category: page.category,
      limit: 10
    });
    
    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products
      }
    };
  }
  catch {
    return {
      notFound: true
  };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[]
}