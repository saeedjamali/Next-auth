import React, { useState } from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '@/pages/context/userProvider';
import { useRouter } from 'next/router';


function Todolist({ user }) {
    // console.log("User : ", user.todo)
    const [showAddTodo, setShowAddTodo] = useState(false);
    const [title, setTitle] = useState("");
    const [todos, setTodos] = useState(user.todo);
    const [isDone, setIsDone] = useState(false);
    const router = useRouter();
    const { setIsLoggedIn, setIsAdmin, handleSignOut, setUser } = useUser();

    const getAllTodo = async () => {
        try {
            const response = await axios.get(`/api/auth/me`);
            if (response.status == 200) {
                // toast.success(response.data.message);
                // console.log("Respomse  :", response);
                setTodos(response.data.data.todo)
                setTitle("")
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log("Add Todo : ", error);
        }
    }

    const handleShowAddTodo = (e) => {
        e.preventDefault();
        setShowAddTodo((prev) => !prev);
    }


    const handleAddTodo = async (e) => {
        e.preventDefault();

        if (!title) {
            toast.error("Title is Empty !!")
            return false
        }

        const newTodo = {
            isDone: false,
            title,
            //! 1 way for add user id
            user: user._id
            //* 2 best way : get id or email backend side 
            //روش درست اینه که یوزر ایدی یا ایمیل را سمت بکند ار توکن بگیریم / دریافت اطلاعات سمت بکند ایمن تر هست
        }
        try {
            const response = await axios.post("/api/todo", newTodo);
            if (response.status == 201) {
                toast.success(response.data.message);
                //! 1 way realtime update todolist
                // setTodos((prev) => { return [...todos, newTodo] })
                //* 2 way best way for update todolist
                getAllTodo();
                setTitle("");
            } else if (response.status == 401) {
                router.push("/signin");
                toast.error(response.data.message);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {

            if (error.response.status == 401) {
                router.push("/signin");
                setIsAdmin(false);
                setIsLoggedIn(false);
                setUser({});
                toast.error(error.response.data?.message);

            }
            console.log("Add Todo : ", error.response.data.message);
        }
    }

    const handleCompleteTodo = async (e, id, currentIsDone) => {
        console.log(e.target.value);
        try {
            const response = await axios.put(`api/todo/${id}`, { isDone: !currentIsDone });
            if (response.status == 200) {
                toast.success(response.data.message);
                getAllTodo();
            } else {
                toast.error(response.data.message)

            }
        } catch (error) {
            console.log("Error in handleCompleteTodo : ", error)
        }

    }
    const handleDeleteTodo = async (e, id) => {
        try {
            const response = await axios.delete(`api/todo/${id}`);
            if (response.status == 200) {
                toast.success(response.data.message);
                getAllTodo();
            } else {
                toast.error(response.data.message)

            }
        } catch (error) {
            console.log("Error in handleDeleteTodo : ", error)
        }
    }
    return (
        <div>
            <>
                <h1>Next-Todos</h1>

                {todos.length == 0 && <div className='w-full flex items-center justify-center'>
                    <p>⚠ Please add a task first!</p>
                </div>
                }
                <div className="container">
                    {showAddTodo &&
                        <div className="form-container" onSubmit={(e) => handleAddTodo(e)}>
                            <form className="add-form">
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    id="input"
                                    type="text"
                                    placeholder="Type your To-Do works..."
                                />
                                <button type="submit" id="submit" onClick={(e) => handleAddTodo(e)}>
                                    ADD
                                </button>
                            </form>
                        </div>
                    }
                    <div className="flex items-center justify-between bg-[#ef0722] px-4 py-2 rounded-t-md">
                        <div className="bg-red-300 p-1 rounded-md">
                            <p>{`${user.firstname} ${user.lastname}`}</p>
                        </div>
                        <button className="flex items-center justify-between cursor-pointer" onClick={(e) => handleShowAddTodo(e)}>
                            <svg
                                width="2rem"
                                height="2rem"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                                />
                            </svg>
                        </button>
                        <div className="time">
                            <a href="#" onClick={handleSignOut}>Logout</a>
                        </div>
                    </div>
                    <div className="pad">
                        {
                            todos.map((todo) =>
                                <div id="todo">
                                    <ul id="tasksContainer">
                                        <li>
                                            <span className="mark">
                                                <input type="checkbox" className="checkbox" checked={todo.isDone} onChange={(e) => handleCompleteTodo(e, todo._id, todo.isDone)} />
                                            </span>
                                            <div className="list">
                                                <p>{`${todo.title}`}</p>
                                            </div>
                                            <span className="delete" onClick={(e) => handleDeleteTodo(e, todo._id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            )

                        }
                    </div>
                </div>
            </>
        </div >
    )
}

export default Todolist


