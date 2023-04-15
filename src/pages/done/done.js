import Image from 'next/image'
import { Inter } from 'next/font/google'
import React from 'react';
import Link from 'next/link'
import { TodoEntry } from '@/components/TodoForm';
import { getListEntriesByUserId } from '@/callFuncts/dbFuncts';
import { useAuth } from '@clerk/nextjs';
const inter = Inter({ subsets: ['latin'] })

const handleSubmit = (event) => {
  event.preventDefault();
  alert(`Description Is: ${desc}`)
}


function TodoList() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const userEntries = [];
  console.log(userEntries);
  async function updateUserEntries() {
    const userEntries = await getListEntriesByUserId(userId, true);
    console.log(userEntries);
  }
  React.useEffect(() => {
    updateUserEntries();
    console.log("User Entries Updated");

    getListEntriesByUserId(userId, true)
      .then(d => {
        setListContents(d)
      })

  }, []);
  const [listContents, setListContents] = React.useState(userEntries);

  const updateList = (textInput) => {

    getListEntriesByUserId(userId, true)
      .then(d => {
        setListContents(d)
      })
    console.log(listContents);
    updateUserEntries();
    console.log(listContents);
  }

  return (
    <main className="h-screen pt-4 w-full flex flex-col items-center bg-white">


      <div className="w-full h-auto bg-stone-900 border-4 border-slate-900">
        <h1 className="text-white font-bold text-6xl pl-16 pt-16">List of Completed Tasks</h1>
        <h2 className="text-white font-normal text-2xl pl-16 py-8"><Link href="todos">Access To Do List</Link></h2>


        <div className='ml-16'>
          {listContents.map(entry => (
            <div key={entry["_id"]} className="w-full h-auto divide-y-4 bg-slate-500 border-4 border-slate-900">
              <div className=" flex flex-col md:flex-row justify-center items-center">
                <div className="w-full md:w-1/5 justify-center items-center">
                <input className="pt-1 w-1/2 h-12" type="checkbox" name="checkBox1" checked></input>
                </div>
                <Link href={"todo/"+entry["_id"]} className='w-full'>
                <div className="w-full md:w-4/5 flex-col md:flex-row items-center justify-center mr-auto">
                  <p className="p-1  truncate ... font-normal text-white mb-3">{entry["desc"]}</p>
                </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>

  );
};

export default TodoList;