import React, {useMemo, useState} from "react";
import s from "./pagination.module.scss"
import {forEach} from "react-bootstrap/ElementChildren";
import {useScroll} from "../../hooks/useScroll";

interface Props {
    page: number,
    pages: number,
    changesPage: () => void
}

export const Pagination = ({page, pages, setPage}: Props) => {
    const [mp, setMp] = useState([])
    const {scrollToTop} = useScroll()

    const changePage = (page) => {
        setPage(page)
    }
    const forward = (direction) => {
      if (direction == "next"){
          if (page < pages) {
              changePage(page + 1)
              scrollToTop()
          }
      }
      if (direction == "after"){
          if (page > 1){
              changePage(page - 1)
              scrollToTop()
          }
      }
    }
    useMemo(() => {
        for (let i = 1; i <= pages; i++) {
            mp[i] = i
        }
        setMp(mp)
    }, [pages, mp])

    return (
        <nav aria-label="Page navigation example">
            <ul className={s.pagination + " pagination"}>
                <li onClick={() => forward("after")} className="page-item">
                    <a className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {mp.map((p) => (
                    <li
                        onClick={() => changePage(p)}
                        key={p}
                        className="page-item"
                    >
                        <a className="page-link" href="#">{p}</a>
                    </li>
                ))}
                <li onClick={() => forward("next")} className="page-item">
                    <a className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}