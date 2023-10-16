export interface ProductCharacteristic {
    value: string;
    name: string;
}

export interface ReviewModel {
    _id: string;
    name: string;
    title: string;
    description: string;
    rating: number;
    createdAt: Date;
}

export interface ProductModel {
    tags: string[];
    title: string;
    _id: string;
    categories: string[];
    link: string;
    price: number;
    credit: number;
    oldPrice: number;
    description: string;
    characteristics: ProductCharacteristic[];
    createdAt: Date;
    updatedAt: Date;
    image: string;
    __v: number;
    initialRating: number;
    reviews: ReviewModel[];
    reviewCount: number;
    reviewAvg?: number;
    advantages?: string;
    disadvantages?: string;
}