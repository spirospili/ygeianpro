import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import SearchData from './SearchData'

function TopSearchAndFilter() { 

    const [searchKey, setSearchKey] = useState('')
    console.log(searchKey);
    let history = useHistory();
    const dataRender=() =>{
        // return <Route exact path={`/search/:${searchKey}`} component={SearchData} />
        history.push(`/search/${searchKey}`)
    }
return (
    <>
        <div className="row">
            <div className="col-md-12">
                <div className="searchbar-style" >
                    <div className="input-group">
                        <input type="text" className="form-control" value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}} placeholder="Search by keyword" />
                        <span className="input-group-btn">
                            <button className="btn" type="submit"  onClick={dataRender}>Search</button>
                        </span>
                    </div>
                </div>
            </div>
          {/*  <div className="col-md-4">
                <div className="form-group input-group">
                    <select className="form-control filter-bar">
                        <option value="">Filters</option>
                        <option value="select">Select1</option>
                        <option value="select">Select2</option>
                    </select>
                </div>
            </div>*/}
        </div>
        <hr />
    </>
  )
}

export default TopSearchAndFilter;