// https://www.robinwieruch.de/react-form/
import * as React from 'react';
import { addCategoryEntry} from '@/callFuncts/dbFuncts';
const CategoryEntry = ({ listElements, userToken, todoElementsUpdate, category }) => {
    const handleChange = (event) => {
        // console.log(categoryForm);

        setCategoryForm({
            [event.target.id]: event.target.value,
        });
    };
    const [categoryForm, setCategoryForm] = React.useState({
        categories: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (categoryForm.categories != '') {
            // console.log(categoryForm.categories);
            addCategoryEntry(categoryForm.categories, userToken);
            todoElementsUpdate();
            // console.log(listElements);
            // form.categories = '';
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='w-1/5 flex flex-col'>
                <label htmlFor="desc">Add Category</label>
                <input
                    className='text-black'
                    id="categories"
                    type="text"
                    value={categoryForm.categories}
                    onChange={handleChange} />
            </div>
            <button>Add New Category Label</button>
        </form>
    );
};

export { CategoryEntry };