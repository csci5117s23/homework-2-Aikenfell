import Image from 'next/image'
import { Inter } from 'next/font/google'
import React from 'react';
import { LoginForm } from '@/components/TodoForm';

const inter = Inter({ subsets: ['latin'] })

const handleSubmit = (event) => {
  event.preventDefault();
  alert(`Description Is: ${desc}`)
}


function TodoList() {
  const [listContents, setListContents] = React.useState([{ id: 1, text: 'test' }, { id: 2, text: 'test2' }, { id: 3, text: 'test3' }]);
  const updateList = (textInput) => {
    const newList = listContents.concat({ id: listContents.length + 1, text: textInput });

    setListContents(newList);
    console.log(listContents);
  }

  return (
    <main className="h-screen pt-4 w-full flex flex-col items-center bg-white">


      <div className="w-full h-auto bg-stone-900 border-4 border-slate-900">
        <h1 className="text-white font-bold text-6xl pl-16 pt-16">User To Do List</h1>
        <h2 className="text-white font-normal text-2xl pl-16 pt-8">Access To Do List</h2>

        <LoginForm listElements={listContents} todoElementsUpdate={updateList} />

        <h3 className="text-white font-normal text-lg pl-16 pt-4">View Completed Items</h3>
        {listContents.map(entry => (
          <li key={entry["id"]}>{entry["text"]}</li>
        ))}
      </div>




    </main>

  );
};

export default TodoList;