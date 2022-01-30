import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';

export default function Personality() {
    const navigate=useNavigate();
    useEffect(() => {
      
    }, []);
    
    function formSub(e){
        e.preventDefault()
    var formData=new FormData(e.target)
    var q1=document.getElementsByName('Q1')
    var checkItem
    for(var x=0;x<q1.length;x++){
        if(q1[x].checked){
            checkItem=q1[x];
            break;
        }
    }
    console.log(q1)
 axiosInstance.post('api/personality/res',{
    data: {
     Sex:'Male',
     Age:'20',
     Nick:'ck',
     Country:'India',
     Q1:checkItem.value
    }

 }).then((res)=>{
    console.log(res.data.data)
    console.log(res.data.data['SEP'])
    var data=res.data.data
     navigate('/per/result', { state: {'SEP':data['SEP'], 'SEFP':data['SEFP'],
    'LO':data['LO'], 'HI':data['HI'], 'SE':data['SE'], 'SAP':data['SAP'], 'SAFP':data['SAFP'], 'SA':data['SA'],
    'SC':data['SC'], 'SCP':data['SCP'], 'SCFP':data['SCFP'], 'flev':data['flev'],
    'SOP':data['SOP'], 'SOFP':data['SOFP'],
    'SO':data['SO'], 'Nick':data['Nick'], 'Country':data['Country'],
    'SNP':data['SNP'], 'SNFP':data['SNFP'], 'Category':data['Category'],
    'SN':data['SN']} })
 })
     }
  return (
      <>
      <div>
      <div className="container">
      <div className="starter-template">
        <h2>
          Instructions for Completing the IPIP-NEO Short Form
        </h2>
        <p>
          The following pages contain phrases describing people's behaviors.
          Please use the rating scale next to each phrase to describe how
          accurately each statement describes you. Describe yourself as you
          generally are now, not as you wish to be in the future. Describe
          yourself as you honestly see yourself, in relation to other people
          you know of the same sex as you are, and roughly your same age. So
          that you can describe yourself in an honest manner, your responses
          will be kept in absolute confidence. Please read each statement
          carefully, and then click the circle that corresponds to the accuracy
          of the statement.
        </p>
        <p>
          Answer every item. Failing to answer items will return an invalid
          narrative report. Note that the answer circles appear directly to
          the right of each question. Please make sure that the circle you
          are choosing corresponds to the question you are considering. If
          you make a mistake or change your mind, simply click the circle
          you wish to choose. After you have answered the questions, pressing
          the send button will send your responses to the scoring program and
          will return an interpretive report to you.
        </p>

            <form onSubmit={formSub}>
                        <p>
                            All responses to this inventory from all respondents are
                            completely confidential and will <b><u>not</u></b> be
                            associated with you as an individual. Responses are, however,
                            automatically entered into a database in order to improve norms
                            by age and sex and to assess the statistical properties of item
                            responses for groups of respondents. To ensure confidentiality
                            of your responses to the inventory, <b>DO NOT</b> enter your
                            real name in the box below. Please use a nickname or made-up
                            name. If you do not enter a nickname with at least one letter
                            or numeral in it, a random nickname will be generated for you.
                        </p>

                        <p>
                            <span style={{fontSize:"150%"}}>Your Nickname or Made-up Name</span>
                            <input NAME="Nick" VALUE="" size={50}/> <br/>&nbsp;
                        </p><u><span style={{fontSize:'150%',color:'#FF0000'}}>This inventory will not be scored
                            unless valid values for sex, age, and country are entered.</span></u>
                            <br/>&nbsp;
                            <br/>&nbsp;
                        <table>
                            <tr>
                                <td style={{fontSize:'150%'}}>Sex: </td>
                                <td><b>Male</b>
                                    <br/><input TYPE="RADIO" NAME="Sex" VALUE="Male"/>
                                </td>
                                <td><b>Female</b>
                                    <br/><input TYPE="RADIO" NAME="Sex" VALUE="Female"/>
                                </td>
                            </tr>
                        </table>
                        <p><span style={{fontSize:'150%'}}>Age: </span><input NAME="Age" VALUE="" size={10}/>
                        </p>When selecting your country, please indicate the country to which you feel you belong the most, whether by virtue of citizenship, length of residence, or acculturation.
                        <p>
                            <span style={{fontSize:'150%'}}>Country:</span>
                            
                            <select
                  style={{ width: "90px" }}
                  id="tags"
                  className="form-control form-inline mb-2 language"
                  name='Country'
                >
                 <option value="">Select Your Country</option>
                 <option value="India" selected>India</option>
                </select>
                            <br/>&nbsp;
                            <br/>&nbsp;
                        <table border id="main">
                            <tr>
                                <td>1.&nbsp;</td>
                                <td>Worry about things.</td>
                                <td>
                                    Very
                                    <br/>Inaccurate
                                    <br/><input TYPE="RADIO" NAME="Q1" VALUE="1"/>
                                </td>
                                <td>
                                    Moderately
                                    <br/>Inaccurate
                                    <br/><input TYPE="RADIO" NAME="Q1" VALUE="2"/>
                                </td>
                                <td>
                                    Neither Accurate
                                    <br/>Nor Inaccurate
                                    <br/><input TYPE="RADIO" NAME="Q1" VALUE="3"/>
                                </td>
                                <td>
                                    Moderately
                                    <br/>Accurate
                                    <br/><input TYPE="RADIO" NAME="Q1" VALUE="4"/>
                                </td>
                                <td>
                                    Very
                                    <br/>Accurate
                                    <br/><input TYPE="RADIO" NAME="Q1" VALUE="5"/>
                                </td>
                            </tr>  
                        </table>
                        <p><b>PLEASE NOTE:</b> Your results should appear on your screen within moments after clicking the Send button. If nothing happens, something has gone wrong. Clicking the button again and again will not help.</p>
                        <p>
                            As I indicated in the warning at the beginning of the test, I am a psychologist, not a computer technician, so I have no definitive way of solving any person's particular computer problem.  For people who were unable to complete the test, sometimes using a better computer, faster internet connection, or just taking the test on a different day and time led to success. If you experience difficulties, you can email me if you like (j5j at psu.edu),
                             but I won't be able to tell you anything more than what I have just said here.
                        </p>
                        </p><br/><input type="submit" value="Send Answers"/><b>&nbsp;&nbsp;This
                            will send your answers to be scored and post your results.</b>
            </form>
         </div>
      </div>
  </div>
  </>)
}

