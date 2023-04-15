import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import React from 'react';
import { getListEntriesByUserId, setListItemDone } from '@/callFuncts/dbFuncts';
import { useAuth } from '@clerk/nextjs';
import { TodoEntry } from '@/components/TodoForm';
import { CategoryEntry } from '@/components/CategoryForm';
const inter = Inter({ subsets: ['latin'] })

const handleSubmit = (event) => {
  event.preventDefault();
  alert(`Description Is: ${desc}`)
}


function TodoList() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const userEntries = [];
  async function updateUserEntries() {
    getListEntriesByUserId(userId, false)
      .then(d => {
        setListContents(d)
      })
  }


  React.useEffect(() => {
    updateUserEntries();
    // console.log("User Entries Updated");
  }, []);
  const [listContents, setListContents] = React.useState(userEntries);

  const markDone = (target) => {
    
    // console.log(target+" Marking Done");
    setListItemDone(target,true)      .then(d => {
      // console.log(target+" Is Done");
      updateUserEntries();
    })
        updateUserEntries();
  }

  const updateList = () => {
    updateUserEntries();
    // console.log(listContents);
  }


  return (
    <main className="h-screen pt-4 w-full flex flex-col items-center bg-slate-800">


      <div className="w-full h-auto bg-stone-900 border-4 border-slate-900">
        <h1 className="text-white font-bold text-6xl pl-16 pt-16">To Do List</h1>
        <h2 className="text-white font-normal text-2xl pl-16 py-8"><Link href="done">Access Done List</Link></h2>
        
        <div className='ml-16'>
          <div>
        <TodoEntry listElements={listContents} userToken={userId} todoElementsUpdate={updateList} category={'None'} />
        <CategoryEntry listElements={listContents} userToken={userId} todoElementsUpdate={updateList} category={'None'} />

          </div>
          <div className='w-full'>
          <div className='w-1/5'>
          </div>

          <div className='w-4/5'>
          {listContents.map(entry => (
            <div key={entry["_id"]} className="w-full h-auto divide-y-4 bg-slate-500 border-4 border-slate-900">
              <div className=" flex flex-col md:flex-row justify-center items-center">

                <div onClick={() => markDone(entry["_id"])} className="w-full md:w-1/5 justify-center flex flex-row items-center">
                  <p className="truncate ...">Mark Complete</p>
                  <input className="pt-1 w-1/2 h-12" type="checkbox" name="checkBox1"></input>
                </div>

                {/* <Route path={matchMedia.url}></Route> */}
                <Link href={"todo/"+entry["_id"]} className='w-full'>
                <div className="w-full md:w-4/5 flex-col md:flex-row items-center justify-center ml-auto">
                  <p className="p-1  truncate ... font-normal text-white mb-3">{entry["desc"]}</p>
                </div>
                </Link>
              </div>
            </div>
          ))}
</div>

</div>
        </div>
      </div>




    </main>

  );
};

export default TodoList;