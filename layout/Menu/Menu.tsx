import { AppContext } from '@/context/app.context';
import styles from './Menu.module.css';
import { useContext, KeyboardEvent } from 'react';
import { FirstLevelMenuItem, PageItem } from '@/interfaces/menu.interface';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '@/helpers/helpers';
import { motion } from 'framer-motion';
import { useMenuQuery } from '@/hooks/useWrapperQuery';

export const Menu = (): JSX.Element => {
    const { setMenu, firstCategory } = useContext(AppContext);

    const router = useRouter();

    const {data: menuHook} = useMenuQuery(firstCategory);
   
    if (!menuHook) {
        return <></>;
    }
    
    const variants = {
        visible: {
            marginBottom: 20,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: { 
            marginBottom: 0 
        }
    };

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 'auto'
        },
        hidden: { 
            opacity: 0,
            height: 0
        }
    };

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menuHook.map(m => {
            if (m._id.secondCategory == secondCategory) {
                m.isOpened = !m.isOpened;
            } else if (m._id.secondCategory !== secondCategory) {
                m.isOpened = false;
            }
            return m;
        }));
    };

    const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
        if (key.code == 'Space' || key.code == 'Enter') {
            key.preventDefault;
            openSecondLevel(secondCategory);    
        }
    };

    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map(m => (
                    <div key={m.route}>
                        <Link key={m.id} href={`/${m.route}`}>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: m.id == firstCategory
                            })}>
                                {m.icon}
                                <span>{m.name}</span>
                            </div>
                        </Link>
                        {m.id == firstCategory && buildSecondLevel(m)}
                    </div>
                ))} 
            </>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menuHook.map(m => {
                    if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpened = true;
                    }
                    return (
                    <div key={m._id.secondCategory}>
                        <div 
                            tabIndex={0} 
                            onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)} 
                            className={styles.secondLevel} 
                            onClick={() => openSecondLevel(m._id.secondCategory)}
                        >
                            {m._id.secondCategory}</div>
                        <motion.div 
                            layout
                            initial={m.isOpened ? 'visible' : 'hidden'}
                            animate={m.isOpened ? 'visible' : 'hidden'}
                            variants={variants}
                            className={cn(styles.secondLevelBlock)}
                        >
                            {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                        </motion.div>
                    </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
        return (
            pages.map(p => (
                <motion.div 
                    key={p._id}
                    variants={variantsChildren}    
                >
                    <Link tabIndex={isOpened ? 0 : -1} href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                    })}>
                        {p.category}
                    </Link>
                </motion.div>
            ))
        );
    };

    
    return (
        <div className={styles.menu}>
            {buildFirstLevel()}
        </div>
    );
};
