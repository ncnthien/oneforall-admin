import { NewSubBrand, SubBrandTableProps } from 'features/Brand/interface'
import React, { useState } from 'react'

const SubBrandTable: React.FC<SubBrandTableProps> = ({
  subBrands,
  addSubBrand,
  deleteSubBrand,
}) => {
  const nameMinLength = 2
  const nameMaxLength = 18
  const defaultNewSubBrand = { name: '' }
  const newSubBrandPlaceholder = 'New sub brand...'
  const [newSubBrand, setNewSubBrand] =
    useState<NewSubBrand>(defaultNewSubBrand)

  const handleNewSubBrandNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewSubBrand({ ...newSubBrand, name: event.target.value })
  }

  const handleAddButtonClick = () => {
    if (
      newSubBrand.name.length <= nameMinLength ||
      newSubBrand.name.length >= nameMaxLength
    ) {
      return
    }

    addSubBrand(newSubBrand)
    setNewSubBrand(defaultNewSubBrand)
  }

  const handleRemoveButtonClick =
    (subBrandId: string, subBrandName: string) => () => {
      deleteSubBrand(subBrandId, subBrandName)
    }

  const renderSubBrandList = (): JSX.Element[] =>
    subBrands.map(brand => {
      return (
        <li key={brand._id} className='flex justify-between w-60 mb-2'>
          <span>{brand.name}</span>
          <button
            onClick={handleRemoveButtonClick(brand._id, brand.name)}
            className='bg-red-400 text-xs text-white px-2 hover:bg-red-500 transition-all'
          >
            Remove
          </button>
        </li>
      )
    })

  return (
    <ul>
      {renderSubBrandList()}
      <li className='flex justify-between w-60 mb-2'>
        <input
          type='text'
          className='border-b-2 border-gray-300 transition-all outline-none focus:border-green-400 w-full'
          placeholder={newSubBrandPlaceholder}
          value={newSubBrand.name}
          onChange={handleNewSubBrandNameChange}
        />
        <button
          onClick={handleAddButtonClick}
          className={`bg-green-400 text-xs text-white px-2 transition-all ml-10 opacity-50 cursor-default ${
            newSubBrand.name.length > nameMinLength &&
            newSubBrand.name.length < nameMaxLength
              ? 'hover:bg-green-500 opacity-100 cursor-pointer'
              : ''
          }`}
          disabled={
            newSubBrand.name.length <= nameMinLength ||
            newSubBrand.name.length >= nameMaxLength
          }
        >
          Add
        </button>
      </li>
    </ul>
  )
}

export default SubBrandTable
