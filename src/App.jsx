import './App.css'
import {useAddProductsMutation, useDeleteProductMutation, useGetAllProductsQuery} from "./store/productsApi"
import { Button, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function App() {
  const {data = []} = useGetAllProductsQuery()
  const [saveProducts] = useAddProductsMutation()
  const [deleteProduct] = useDeleteProductMutation()
  
  function handleSubmit(e){
    e.preventDefault()
    const data1 = {
      title:e.target.title.value
    }
    saveProducts(data1)
    e.target.reset()
  }

  return (
    <div className='p-5'>
      <form 
        onSubmit={handleSubmit} 
        className='w-full max-w-lg mx-auto bg-gray-800 p-6 rounded-xl shadow-lg transform transition duration-300 ease-in-out hover:shadow-2xl'
        autoComplete='off'
      >
        <div className="flex items-center gap-4">
          <TextField 
            name='title' 
            className='w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400'
            placeholder='Enter Product Name' 
            size='medium' 
            required 
            InputProps={{
              style: { color: '#fff' },
            }}
          />
          <Button 
            type='submit' 
            variant='contained' 
            color='primary' 
            size='large'
            className='bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md transition-transform duration-200 transform active:scale-95 disabled:bg-gray-600 disabled:cursor-not-allowed'
          >
            Sumbit
          </Button>
        </div>
      </form>
      <ul className='w-[500px] mx-auto bg-red p-5 rounded mt-5 bg-[#444444]'>
        {data.map((item, index) => (
          <li className='p-3 rounded-md flex items-center justify-between bg-slate-400 mt-3' key={item.id}>
            <div>{index + 1}.{item.title}</div>
            <div className='flex gap-[5px]'>
            <EditIcon 
              sx={{ fontSize: 25 }}
              className='text-blue-700 cursor-pointer text-[20px]'
            />
            <DeleteIcon 
              sx={{ fontSize: 25 }}
              className='text-red-700 cursor-pointer text-[20px]'
              onClick={() => deleteProduct(item.id)} 
            />
            </div>           
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
