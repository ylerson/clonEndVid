'use client';

import menu from '../database/menu.json';
import course from '../database/course.json';
import {useState} from 'react';
import Pagination from '@/components/pagination';

export default function Home() {
    const [levels, setLevels] = useState('1-Beginner');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleChangeLevels = (category) => {
        setLevels(category);
        // console.log(category);
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <main className="bg-gray-100 flex ">
            <section className="flex flex-col p-8 gap-4 w-1/2">
                <header className="flex flex-col gap-4">
                    <div>
                        <h1 className="font-bold text-gray-900 text-xl">
                            Cursos de ingles EngVid
                        </h1>
                    </div>
                    <ul className="flex gap-2">
                        {menu.levels.map((category) => {
                            return (
                                <li>
                                    <button
                                        onClick={() =>
                                            handleChangeLevels(category.name)
                                        }
                                        className={
                                            levels === category.name
                                                ? ' rounded-xl px-2 bg-orange-500 text-white'
                                                : 'border border-gray-500 rounded-xl px-2'
                                        }
                                    >
                                        {category.name}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </header>
                <section className="flex flex-col gap-2">
                    {course
                        .filter((courses) => courses.category == levels)
                        .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                        )
                        .map((individual) => {
                            return (
                                <div className="flex bg-white rounded-md shadow overflow-hidden p-2 gap-2">
                                    <img
                                        className="w-12 h-12 rounded-md"
                                        src={individual.avatar}
                                        alt=""
                                    />
                                    <div className="flex gap-2">
                                        <div className="flex flex-col">
                                            <h2 className="text-gray-900 font-bold">
                                                {individual.title}
                                            </h2>
                                            <span className="text-gray-400 text-sm">
                                                {individual.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={
                            course.filter((courses) => courses.category).length
                        }
                        onPageChange={handlePageChange}
                        displayPageCount={5}
                    />
                </section>
            </section>
            <section className="bg-white shadow h-screen w-1/2 p-8 flex flex-col gap-4">
                <div className="rounded-xl overflow-hidden shadow">
                    <iframe
                        className="w-full h-64"
                        src="https://www.youtube.com/embed/u7OcCscC7Mo?modestbranding=1&title=&autohide=1&wmode=transparent&rel=0&showinfo=0&theme=light&enablejsapi=1&origin=https://www.engvid.com"
                    ></iframe>
                </div>
                <div>
                    Level:{' '}
                    <span className="border bg-gray-300 text-gray-500 px-2 rounded-xl">
                        Beginner
                    </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                    English for Career
                </h3>
                <p className="text-sm text-gray-400">
                    In this course you learn some of english with videos of
                    endvid so, take chair a learn a litle of english very easy
                </p>
                <button className="bg-red-500 text-white rounded-3xl px-4 py-2">
                    Subscribirte al Canal
                </button>
            </section>
        </main>
    );
}
