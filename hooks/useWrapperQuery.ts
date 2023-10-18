import { API } from '@/helpers/api';
import { MenuItem } from '@/interfaces/menu.interface';
import { TopPageModel } from '@/interfaces/page.interface';
import { ProductModel } from '@/interfaces/product.interface';
import axios from 'axios';
import { useQuery } from 'react-query';


export function useMenuQuery(firstCategory: number) {
    const finalOptions = { 
      queryKey: ['menu', firstCategory],
      queryFn: async () => {
        const response = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory });
        return response.data;
      },
    };
      
    return useQuery<MenuItem[], Error>(finalOptions);
}

export function usePageQuery(alias: string) {
    const finalOptions = { 
      queryKey: ['page', alias],
      queryFn: async () => {
        const response = await axios.get<TopPageModel>(API.topPage.byAlias + alias);
        return response.data;
      },
    };
      
    return useQuery<TopPageModel, Error>(finalOptions);
}


export function useProductQuery(category: string) {
    const finalOptions = { 
      queryKey: ['product', category],
      queryFn: async () => {
        const response = await axios.post<ProductModel[]>(API.product.find, {
          category: category,
          limit: 10
        });
        return response.data;
      },
    };
      
    return useQuery<ProductModel[], Error>(finalOptions);
}
