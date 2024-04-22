import React from 'react'
import { Link } from 'react-router-dom'

function ViewDigitalService() {
    return (
        <>
            <div className='view-services'>
                <div className='view-text'>
                    <h2 className='pf-h2'>View Digital Service</h2>
                    <p style={{ fontSize: 14 }}>Showcase your brand in a way your customers will remember and appreciate</p>
                </div>
                <hr />
                <div className='view-contain'>
                    <div className='view-content'>
                        <div className='view-image'>
                            <img className='view-logo' src='https://static.cdn.printful.com/static/v864/images/dashboard/branding/marketing-info-item-1.webp?v=1' />
                        </div>
                        <div className='view-label'>
                            <h3>Logo Designing</h3>
                            <p style={{ fontSize: 16 }}>Tailor your store’s order tracking page to include your branding</p>
                            <Link to='/settingdigitalservice' style={{ listStyle: "none", fontSize: 15 }}>Set up now</Link>
                        </div>
                    </div>

                    <div className='view-content'>
                        <div className='view-image'>
                            <img className='view-logo' src='https://static.cdn.printful.com/static/v864/images/dashboard/branding/marketing-info-item-2.webp?v=1' />
                        </div>
                        <div className='view-label'>
                            <h3>Label Designing</h3>
                            <p style={{ fontSize: 16 }}>Tailor your store’s order tracking page to include your branding</p>
                            <Link to='/settingdigitalservice' style={{ listStyle: "none", fontSize: 15 }}>Set up now</Link>
                        </div>
                    </div>

                </div>

                <div className='view-contain'>
                    <div className='view-content'>
                        <div className='view-image'>
                            <img className='view-logo' src='https://static.cdn.printful.com/static/v864/images/dashboard/branding/marketing-info-item-7.jpg' />
                        </div>
                        <div className='view-label'>
                            <h3>Image Designing</h3>
                            <p style={{ fontSize: 16 }}>Tailor your store’s order tracking page to include your branding</p>
                            <Link to='/settingdigitalservice' style={{ listStyle: "none", fontSize: 15 }}>Set up now</Link>
                        </div>
                    </div>

                    <div className='view-content'>
                        <div className='view-image'>
                            <img className='view-logo' src='https://static.cdn.printful.com/static/v864/images/dashboard/branding/marketing-info-item-4.webp?v=1' />
                        </div>
                        <div className='view-label'>
                            <h3>Packaging Designing</h3>
                            <p style={{ fontSize: 16 }}>Tailor your store’s order tracking page to include your branding</p>
                            <Link to='/settingdigitalservice' style={{ listStyle: "none", fontSize: 15 }}>Set up now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewDigitalService