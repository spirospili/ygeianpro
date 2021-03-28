import React from 'react';
import InnerPageHeader from './InnerPageHeader';
import masterCard from "../../../public/images/master.png";
import Footer from './Footer';
import Sidebar from './Sidebar';

class Invoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state).user;
            this.setState({user: AppState});
        }

    }
    render() { 
        return (
          <>
            <InnerPageHeader />
                <section className="inner-page-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <Sidebar />
                            </div>
                            <div className="col-md-9">
                                <div className="right-content-area">
                                    <h2 className="heading-style2">Invoices</h2>
                                    <div className="table-responsive">
                                        <table className="table table-striped invoice-table mt-3">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Description</th>
                                                    <th>Service Period</th>
                                                    <th>Payment Method</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state?.user?.payment_info ? <tr>
                                                    <td> {this.state.user.payment_info.subscription_start}</td>
                                                    <td>Subscription Package {this.state.user.payment_info.total  == "70" ? "Monthly" : "Yearly" }</td>
                                                    <td>{this.state.user.payment_info.subscription_start}-{this.state.user.payment_info.subscription_end}</td>
                                                    <td><img src={masterCard} className="img-fluid" alt="card" /> **** **** **** ****</td>
                                                    <td>$ {this.state.user.payment_info.total}</td>
                                                </tr> : <tr>
                                                    <td>You have not made any transaction</td>

                                                </tr> }


                                            </tbody>
                                        </table>
                                    </div>	
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            <Footer	/>
		  </>
	    )
    }
}
export default Invoice;