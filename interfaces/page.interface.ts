export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products
}

export interface TopPageAdvantage {
    _id: string;
    title: string;
    description: string;
}

export interface HhData {
    _id: string;
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
    updteAt: Date;
}

export interface TopPageModel {
    tags: string[];
    title: string;
    _id: string;
    category: string;
    secondCategory: string;
    alias: string;
    seoText?: string;
    teagsTitle: string;
    metaTitle: string;
    metaDescription: string;
    firstCategory: TopLevelCategory;
    advantages?: TopPageAdvantage[];
    createdAt: Date;
    updatedAt: Date;
    hh?: HhData;
}