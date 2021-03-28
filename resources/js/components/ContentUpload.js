import React from 'react';
import InnerPageHeader from './InnerPageHeader';
import Footer from './Footer';

const ContentUpload = () => {
	return (
		<>
			<InnerPageHeader />
                <section className="content-section content-upload-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="contact-form">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <label>Heading</label>
                                                    <input type="text" className="form-control" name="name" />
                                                </div>
                                                <div className="form-group">
                                                    <label>Category</label>
                                                    <input type="text" className="form-control" name="name" />
                                                </div>
                                                <div className="form-group">
                                                    <label>Tags</label>
                                                    <input type="text" className="form-control" name="name" />
                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                <div className="form-group">
                                                    <label>Description</label>
                                                    <textarea className="form-control" name="description"></textarea>
                                                    <span>(500 words)</span>
                                                </div>
                                                <div className="form-group mt-4">
                                                    <label>Uploads</label>
                                                    <input type="file" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <button type="submit" className="contact-submit mt-4">Submit</button>
                                            </div>	  
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
			<Footer	/>
		</>
	)
}

export default ContentUpload;