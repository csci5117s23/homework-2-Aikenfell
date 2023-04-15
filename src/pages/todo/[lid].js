import { editListEntryDesc, getListEntryById, setListItemDone } from '@/callFuncts/dbFuncts';
import { useRouter } from 'next/router'
import React from 'react';
import Link from 'next/link'
import Router from 'next/router'
function entry(entry) {
    const router = useRouter()
    const { lid } = router.query
    const entryDataBase = {}
    const statusBase = false;
    const [entryData, setEntryData] = React.useState(entryDataBase);
    const [status, setStatus] = React.useState(statusBase);

    const handleChange = (event) => {
        setForm({
            [event.target.id]: event.target.value,
        });
    };
    const [form, setForm] = React.useState({
        desc: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (form.desc != '') {

            editListEntryDesc(lid, form.desc);
        }
    };


    const markDone = (target, listStatus) => {

        console.log(target + " Marking Done");
        setListItemDone(target, !status).then(d => {
            console.log(!status)
            setStatus(!status);
            console.log(target + " Is Done");
        })
    }

    function statusCheck() {
        if (status) {
            return <input className="pt-1 w-1/2 h-12" type="checkbox" name="checkBox1" checked ></input>

        }
        else {
            return <input className="pt-1 w-1/2 h-12" type="checkbox" name="checkBox1" ></input>

        }
    }


    React.useEffect(() => {
        getListEntryById(lid).then(d => {
            console.log(d)
            console.log(d == [])
            if (d[0] === undefined) {
                console.log("Redirecting")
                Router.push('/404');
            }
            else {
            setEntryData(d[0])
            form.desc = d[0]["desc"]
            setStatus(d[0]["completed"])
            console.log(d[0]["completed"])
            console.log(status)
            }
        })
        console.log("User Entries Updated");
        console.log(entryData);
    }, []);

    return (
        <div>

            <div className="h-full pt-4 w-full flex flex-col items-center">

                <div className="w-4/5 h-auto  bg-slate-800  p-4">
                    <div className="bg-slate-500 flex border-slate-900 border-4 flex-col md:flex-row justify-center">

                        <div className="w-full h-auto m-4 p-5 ">

                            <div onClick={() => markDone(lid, entry["completed"])} className="w-full md:w-1/5 justify-center flex flex-row items-center">
                                <h2 className="text-white font-bold text-2xl   mb-2">Mark Complete</h2>
                                {statusCheck()}
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col'>
                                    <label htmlFor="desc">Change Task Description</label>
                                    <textarea
                                        className='text-black h-60'
                                        id="desc"
                                        type="text"
                                        defaultValue={form.desc
                                        }
                                        onChange={handleChange}></textarea>

                                </div>
                                <button>Submit</button>
                            </form>
                            <p className="break-all"></p>
                        </div>


                    </div>
                </div>
                <Link href={"/todos"} className=' mx-auto'>
                    <p className=" font-normal text-white mb-3">Return to List</p>
                </Link>
            </div>
        </div>




    );
};

export default entry

