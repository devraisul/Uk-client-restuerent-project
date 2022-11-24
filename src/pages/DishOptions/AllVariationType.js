import {
  Table, TableBody,
  TableCell, TableHead, TableRow
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { FiSave } from "react-icons/fi";
import { getVariation, updateVariationType } from "../../Apis/variation";
import { useAuth } from "../../context/AuthContext";

const AllVariationType = ({ setIsChangeDetect }) => {
  const { user } = useAuth();
  const [variationData, setVariationData] = useState([])

  const [isChangedDetect, setIsChangedDetect] = useState(Math.random())

  const [editMode, setEditMode] = useState({
    mode: false,
    id: '',
    name: '',
    description: ''
  })
  const [variationEditInputValues, setVariationEditInputValues] = useState({
    name: '',
    description: ''
  })

  // GET ALL VARIATION TYPE 
  useEffect(() => {
    getVariation(user.restaurant[0].id)
      .then(res => {
        setVariationData(res.data);
      })
  }, [isChangedDetect])


  const handleUpdateVariationType = () => {
    const data = {
      name: variationEditInputValues.name === '' ? editMode.name : variationEditInputValues.name,
      description: variationEditInputValues.description === '' ? editMode.description : variationEditInputValues.description,
      VTypeId: editMode.id
    }
    updateVariationType(data).then((res) => {
      if (res?.data?.id) {
        toast.success('Updated Successfully!');
        setEditMode({
          mode: false,
          id: '',
          name: '',
          description: ''
        })
        setIsChangedDetect(Math.random())
      }
    }).catch(err => console.log(err))
  }
  const handleGoToEditMode = (item) => {
    setEditMode({
      mode: true,
      id: item.id,
      name: item.name,
      description: item.description
    })
  }

  return (
    <>
      <Table className="mb-0">
        <TableHead style={{
          background: '#0575B4',
        }}>
          <TableRow>
            <TableCell style={{ color: '#fff' }}>#</TableCell>
            <TableCell style={{ color: '#fff' }}>Name</TableCell>
            <TableCell style={{ color: '#fff' }}>Description</TableCell>
            <TableCell style={{ color: '#fff' }}>Dish Variations</TableCell>
            <TableCell style={{ color: '#fff', textAlign: 'left' }}>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variationData.length > 0 ? variationData?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="pl-3 fw-normal">{index + 1}</TableCell>
              <TableCell className="pl-3 fw-normal">
                <input style={{
                  fontSize: "1rem",
                  padding: '5px 10px',
                  outline: 'none',
                  border: 'none',
                  borderBottom: (editMode.mode && editMode.id === item.id) ? '1px solid #0575B4' : 'none',
                  background: '#F6F7FF'
                }}
                  ddisabled={(editMode.mode && editMode.id === item.id) ? false : true}
                  required
                  type="text"
                  defaultValue={item.name}
                  onChange={(e) => variationEditInputValues.name = e.target.value}
                />
              </TableCell>
              <TableCell>
                <input style={{
                  fontSize: "1rem",
                  padding: '5px 10px',
                  outline: 'none',
                  border: 'none',
                  borderBottom: (editMode.mode && editMode.id === item.id) ? '1px solid #0575B4' : 'none',
                  background: '#F6F7FF'
                }}
                  disabled={(editMode.mode && editMode.id === item.id) ? false : true}
                  required
                  type="text"
                  defaultValue={item.description}
                  onChange={(e) => variationEditInputValues.description = e.target.value}
                />
              </TableCell>
              <TableCell>
                {item.variation.length > 0
                  ?
                  <ol type='disk'>
                    {item?.variation.map(variation => (
                      <li>{variation?.name}</li>
                    ))}
                  </ol>

                  :
                  <span>N/A</span>
                }
              </TableCell>
              <TableCell>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  {(editMode.mode === false || editMode.id !== item.id) &&
                    <>
                      <button
                        style={{ cursor: 'pointer', width: '100%' }}
                        onClick={() => handleGoToEditMode(item)}
                        title="Edit">
                        <Edit style={{ color: 'green', textAlign: 'right' }} />
                      </button>

                      {/* <button title="Delete" >
                        <Delete style={{ color: 'red' }} />
                      </button> */}

                    </>
                  }
                  {(editMode.mode && editMode.id === item.id) &&
                    <button style={{ width: '100%' }} onClick={handleUpdateVariationType} title='Update' >
                      <FiSave style={{ color: '#0575B4', fontSize: '1.3rem', textAlign: 'right' }} />
                    </button>
                  }
                </div>
              </TableCell>
            </TableRow>
          )) :
            <TableRow>
              <TableCell style={{ background: "#DDD", }} colSpan={5}>
                <div
                  style={{ display: 'flex', fontSize: "2rem", justifyContent: 'center', alignItems: 'center' }} >
                  No Data Found!
                </div>
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </>
  );
};

export default AllVariationType;