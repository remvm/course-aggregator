/* eslint-disable @next/next/no-img-element */
import { ProductProps } from "./Product.props";
import styles from './Product.module.css';
import cn from 'classnames';
import { Button, Card, Divider, Rating, Review, ReviewForm, Tag } from "..";
import { declOfNum, priceRu } from "@/helpers/helpers";
import Image from "next/image";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import { motion } from "framer-motion";


export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const variants = {
        visible: { opacity: 1, height: 'auto', padding: 30 },
        hidden: { opacity: 0, height: 0, padding: 0 },
    };

    const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        reviewRef.current?.focus();
    };

    return (
        <div className={className} {...props} ref={ref}>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <Image 
                        src={process.env.NEXT_PUBLIC_DOMAIN + product.image} 
                        alt={product.title}
                        width={70}
                        height={70}
                        quality={50}
                    />
                </div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    {priceRu(product.price)}
                    {product.oldPrice && <Tag className={styles.oldPrice} color='green'>{priceRu(product.price - product.oldPrice)}</Tag>}
                </div>
                <div className={styles.credit}>
                    {priceRu(product.credit)}/<span className={styles.month}>мес</span>
                </div>
                <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating}/></div>
                <div className={styles.tags}>{product.categories.map( c => <Tag className={styles.category} color='ghost' key={c}>{c}</Tag>)}</div>
                <div className={styles.priceTitle}>цена</div>
                <div className={styles.creditTitle}>в кредит</div>
                <div className={styles.rateTitle}><a href="#ref" onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
                <Divider className={styles.hr} />
                <div className={styles.description}>{product.description}</div>
                <div className={styles.feature}>
                    {product.characteristics.map( c => (
                        <div className={styles.characteristics} key={c.name}>
                            <span className={styles.characteristicsName}>{c.name}</span>
                            <span className={styles.characteristicsDots}></span>
                            <span className={styles.characteristicsValue}>{c.value}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.advBlock}>
                    {product.advantages && <div className={styles.advantages}>
                        <div className={styles.advTitle}>Преимущества</div>
                        <div>{product.advantages}</div>
                    </div>}
                    {product.disadvantages && <div className={styles.disadvantages}>
                        <div className={styles.advTitle}>Недостатки</div>
                        <div>{product.disadvantages}</div>
                    </div>}
                </div>
                <Divider className={cn(styles.hr, styles.hr2)} />
                <div className={styles.actions}>
                    <Button appearance='primary'>Узнать подробнее</Button>
                    <Button 
                        appearance='ghost' 
                        arrow={isReviewOpened ? 'down' : 'right'} 
                        className={styles.reviewButton}
                        onClick={() => setIsReviewOpened(!isReviewOpened)}
                    >Читать отзывы</Button>
                </div>
            </Card>
            <Card 
                color='blue' 
                className={styles.reviews} 
                ref={reviewRef} animate={isReviewOpened ? 'visible' : 'hidden'} 
                variants={variants} 
                initial='hidden'
                tabIndex={isReviewOpened ? 0 : -1}
            >
                {product.reviews.map( r => (
                    <div key={r._id}>
                        <Review review={r} />
                        <Divider />
                    </div>
                ))}
                <ReviewForm productId={product._id} isOpened={isReviewOpened} />
            </Card>
        </div>
    );
}));