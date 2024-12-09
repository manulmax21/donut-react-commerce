import React, {useEffect, useState} from "react";
import {CatalogItemComponent} from "./components/catalog_item_component"
import s from "./catalog.module.scss"
import {Filter} from "../../shared/Filter/Filter";
import {Pagination} from "../../shared/pagination/pagination";
import {useCustomDispatch, useCustomSelector} from "../../hooks/store";
import {
    selectorPageProductData, selectorProductData
} from "../../store/selectors";
import {fetchPageProduct} from "../../store/thunks/fetchPageProduct";
import {fetchProduct} from "../../store/thunks/fetchProduct";
import {Loading} from "../Loading/Loading";
import {useScroll} from "../../hooks/useScroll";
import ScrollToTopButton from "../../shared/ScrollToTopButton/ScrollToTopButton";
import {usePageContext} from "../../hooks/usePageContext";

interface Props {

}

export const Catalog = (props: Props) => {
    const pageContext = usePageContext()
    const [page, setPage] = useState(pageContext.pageCount || 1)
    const [searchQuery, setSearchQuery] = useState('');
    const [currentCategory, setCurrentCategory] = useState('all');
    const [isFilterStart, setIsFilterStart] = useState(false);
    const [isFilterMobile, setIsFilterMobile] = useState(false);
    const [isSort, setIsSort] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMain, setIsLoadingMain] = useState(false);
    const [sortedProducts, setSortedProducts] = useState([]);
    const categories = ["пончик", "лакрица"]
    const dispatch = useCustomDispatch()
    const {isSticky: isStickyScroll, scrollToTop} = useScroll()

    const {
        products,
        totalItems,
        currentPage,
        totalPages
    } = useCustomSelector(
        selectorPageProductData
    )
    const {
        products: productsAll
    } = useCustomSelector(
        selectorProductData
    )

    const sortOfCategory = () => {
        if (currentCategory === "all") {
            setSortedProducts(products)
            setIsSort(false)
        }
        else {
            dispatch(fetchProduct())
            const sortedProducts = Object.values(productsAll).filter(p =>
                p.category.toLowerCase() === currentCategory.toLowerCase()
            )
            setSortedProducts(sortedProducts)
            setIsSort(true)
        }
    }
    const changePage = (p) => {
        setIsLoading(true)
        setPage(p)
        if (p && p !== undefined) {
            pageContext.changePage(p)
        }
        dispatch(fetchPageProduct(p))
    }
    const changeCategory = (category) => {
        scrollToTop()
        setCurrentCategory(category)
        setIsLoading(true);
    };
    useEffect(() => {
        if (currentCategory === "all") {
            setSortedProducts(products)
            setIsSort(false)
        }
        else {
            dispatch(fetchProduct())
            const sortedProducts = Object.values(productsAll).filter(p =>
                p.category.toLowerCase() === currentCategory.toLowerCase()
            )
            setSortedProducts(sortedProducts)
            setIsSort(true)
        }
    }, [currentCategory])
    const filerSort = (val) => {
        scrollToTop()
        setIsLoading(true)
        setIsFilterStart(true)
        setSearchQuery("")
        if (val.maxPrice == "void" || val.minPrice == "void") {
            setSortedProducts(products)
            setIsSort(false)
            setIsFilterStart(false)
        }
        else {
            dispatch(fetchProduct())
            let sortedProducts
            if (currentCategory == "all") {
                sortedProducts = Object.values(products)
            }
            else {
                sortedProducts = Object.values(productsAll).filter(p =>
                    p.category.toLowerCase() === currentCategory.toLowerCase()
                )
            }
            const filteredProducts = sortedProducts.filter(product => {
                const isMinPriceValid = val.minPrice === '' || product.price >= parseFloat(val.minPrice);
                const isMaxPriceValid = val.maxPrice === '' || product.price <= parseFloat(val.maxPrice);
                return isMinPriceValid && isMaxPriceValid
            });
            setSortedProducts(filteredProducts)
            setIsSort(true)
        }
    }
    const loaded = (data) => {
        dispatch(fetchPageProduct(page))
        setIsLoading(false)
        setIsLoadingMain(false)
    }
    useEffect(() => {
        setIsLoadingMain(true)
        setTimeout(() => {
            setIsLoadingMain(false)
        }, 1500)
    }, [])
    useEffect(() => {
        dispatch(fetchProduct())
        dispatch(fetchPageProduct(page))
    }, [page])
    useEffect(() => {
        if (searchQuery === '' && currentCategory === 'all' && !isFilterStart){
            scrollToTop()
            setSortedProducts(products)
            setIsSort(false)
        }
        else {
            dispatch(fetchProduct())
            scrollToTop()
            const filteredProducts = Object.values(productsAll).filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setSortedProducts(filteredProducts)
            setIsSort(true)
        }
    }, [searchQuery])

    return (
        <div>
                <div className={s.catalog + " catalog"}>
                    <div className={s.container + " container"}>
                        <div className={s.inner__catalog + " inner__catalog row"}>
                            <div className={`col-xl-3 col-md-3 col-sm-12 ${isFilterMobile ? s.sticky : s.filter__none}`}>
                                <div className={"col-xl-12 col-md-12 col-sm-12"}>
                                    <Filter
                                        filter={filerSort}
                                        setCategory={changeCategory}
                                        categories={categories}
                                    />
                                </div>
                            </div>
                            {!isLoading ?
                                <div className={"col-xl-9 col-md-9 col-sm-12 center " + s.contCarts}>
                                    <div className={"row center "}>
                                        <div className={`input-group mb-3 center ${s.bar_search} ${isStickyScroll ? s.sticky : ""}`}>
                                            <button className={s.btnMy} type="button" id="button-addon1">
                                                <i className={"fi fi-rr-search"}/>
                                            </button>
                                            <input
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                type="text"
                                                className={s.form_control + " form-control"}
                                                placeholder="Поиск по названию..."
                                                aria-label="Example text with button addon"
                                                aria-describedby="button-addon1"
                                            />
                                            <button
                                                onClick={() => setIsFilterMobile(s => !s)}
                                                className={s.btn_filter}
                                                type="button">
                                                <i className={"fi fi-ss-filter"}/>
                                            </button>
                                        </div>
                                        {isSort ?
                                            sortedProducts.map((p:any) => (
                                                <div
                                                    key={p.id}
                                                    className={s.el + " el col-xl-3 col-md-6 col-sm-12 "}
                                                >
                                                    <CatalogItemComponent product={p}/>
                                                </div>
                                            ))
                                            :
                                            Object.values(products).map((p:any) => (
                                                <div
                                                    key={p.id}
                                                    className={s.el + " el col-xl-3 col-md-6 col-sm-12 "}
                                                >
                                                    <CatalogItemComponent product={p}/>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    {!isSort &&
                                        <div className={s.pagination + " col-12 center"}>
                                            <Pagination
                                                setPage={changePage}
                                                page={page}
                                                pages={totalPages}
                                            />
                                        </div>
                                    }
                                </div>
                                :
                                <div className={"row right d-flex justify-content-end"}>
                                    <div className={"col-xl-9 col-md-9 col-sm-12"}>
                                        <Loading
                                            state={loaded}
                                            status={"void"}
                                            body={{}}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            <ScrollToTopButton/>
        </div>
    );
}