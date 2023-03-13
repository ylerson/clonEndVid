'use client';

import menu from '../database/menu.json';
import course from '../database/course.json';
import beginner from '../database/course-detail-beginner.json';
import intermediate from '../database/course-detail-intermediate.json';
import advanced from '../database/course-detail-advanced.json';
import {useState} from 'react';
import Pagination from '@/components/pagination';

export default function Home() {
    const [levels, setLevels] = useState('1-Beginner');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [watchCourse, setWatchCourse] = useState('');
    const courseLevel = {
        beginner,
        intermediate,
        advanced,
    };

    const handleChangeLevels = (category) => {
        setLevels(category);
        // console.log(category);
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleWatchCourse = (category, title) => {
        const categoryTrim = category.split('-')[1].toLowerCase();
        const dataSet = courseLevel[categoryTrim].filter(
            (watch) => watch.title === title
        );
        setWatchCourse(dataSet);
        // console.log(dataSet);
    };

    return (
        <main className="bg-gray-100 flex flex-col md:flex-row">
            <section className="flex flex-col p-8 gap-4 md:w-1/2 order-2 md:order-1">
                <header className="flex flex-col gap-4">
                    <div>
                        <h1 className="font-bold text-gray-900 text-xl">
                            Cursos de ingles EngVid
                        </h1>
                    </div>
                    <ul className="flex gap-2">
                        {menu.levels.map((category) => {
                            return (
                                <li key={category.id}>
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
                        .map((individual, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() =>
                                        handleWatchCourse(
                                            individual.category,
                                            individual.title
                                        )
                                    }
                                    className="flex bg-white rounded-md shadow overflow-hidden p-2 gap-2"
                                >
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
            {watchCourse !== '' && (
                <section className="bg-white order-1 md:order-2 shadow h-screen md:w-1/2 p-8 flex flex-col gap-4">
                    {watchCourse.map((main, index) => {
                        return (
                            <>
                                <div
                                    key={index}
                                    className="rounded-xl overflow-hidden shadow h-96 md:h-[450px]"
                                >
                                    <iframe
                                        className="w-full h-full"
                                        src={main.videoLink}
                                    ></iframe>
                                </div>
                                <div>
                                    Level:{' '}
                                    <span className="border bg-gray-300 text-gray-500 px-2 rounded-xl">
                                        {levels}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {main.title}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {main.description}
                                </p>
                                <a
                                    href={main.subscribeLink}
                                    className="bg-red-500 text-white text-center rounded-3xl px-4 py-2"
                                >
                                    Subscribirte al Canal
                                </a>
                            </>
                        );
                    })}
                </section>
            )}
        </main>
    );
}
