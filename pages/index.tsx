import { Button, Htag, Input, Ptag, Rating, Tag, TextArea  } from "@/components";
import { withLayout } from "@/layout/Layout";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import { MenuItem } from "@/interfaces/menu.interface";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Home({menu}: HomeProps): JSX.Element {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log(counter);
  }, [counter]);
  
const [rating, setRating] = useState<number>(0);

  return (
    <>
      <Htag tag={"h1"}>Заголовок</Htag>
      <Button appearance={"ghost"}>Кнопка 2</Button>
      <Button appearance={"ghost"} arrow="right">Кнопка 3</Button>
      <Ptag size={'l'}>Параграф</Ptag>
      <Button appearance={"primary"} onClick={() => setCounter(x => x + 1)}>Увеличить счетчик</Button>
      <Ptag size={'l'}>{counter}</Ptag>
      <Tag color="red">Red</Tag>
      <Tag color="green">Green</Tag>
      <Tag size="m">Ghost</Tag>
      <Tag size='m' color="primary">Primary</Tag>
      <Rating rating={rating} isEditable setRating={setRating}></Rating>
      <Input placeholder="тест"/>
      <TextArea placeholder="тест2"/>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}