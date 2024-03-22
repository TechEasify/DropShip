import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function SettingDigitalService() {
    const [selectedValue, setSelectedValue] = useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <div className='setting-service'>
                <div className='setting-label'>
                    <h2 className='category-heading'>Setting: Digital Service</h2>
                    <p style={{ fontSize: 16, fontWeight: "bold" }}>Packing Slip</p>
                </div>
                <hr />
                <div className='setting-contain'>
                    <div className='setting-text'>
                        <p style={{ fontSize: 16 }}>Customize your packing slips by adding optional features like your logo, store’s contact info, and a short message. Even if you don’t personalize your packing slips, there won’t be any Printful branding on the packaging.</p>
                        <p style={{ fontSize: 16 }}>Orders routed to backup facilities and partner fulfillment centers won’t have customized packing slips.</p>
                    </div>
                    <div className='setting-empty'></div>
                </div>

                <div className='setting-contain'>
                    <div className='setting-text'>
                        <p style={{ fontSize: 16, fontWeight: "bold" }}>Logo</p>
                        <span>
                            <a href="javascript:" class="pf-btn pf-btn-secondary">Upload logo</a>
                            <input accept=".png,.jpg" type="file" name="file" class="hidden" />
                        </span>
                        <div className='setting-des'>
                            <p style={{ fontSize: 14 }}>Add a 3″ × 2″ black and white logo that we’ll print on your packing slips</p>
                            <ul>
                                <li style={{ fontSize: 14 }}>We'll print the logo on the shipping label too, if there's enough space.</li>
                                <li style={{ fontSize: 14 }}>If a custom packaging logo is added to the order via API integration, we'll print that one instead.</li>
                            </ul>
                        </div>
                        <div className='setting-email'>
                            <div className='setting-name'>
                                <p style={{ fontSize: 16, fontWeight: "bold" }}>Your store’s customer service email</p>
                                <div className='setting-input'>
                                    <input data-v-537602ec="" placeholder="support@brand.com" name="pslipEmail" id="packing-slip-email-input" autocomplete="on" aria-label="" aria-describedby="packing-slip-email-input-help packing-slip-email-input-error" step="1" type="email" class="pf-form-control pf-ui-body" aria-required="false" aria-invalid="false" />
                                </div>
                                <div className='setting-checkbox'>
                                    <p style={{ fontSize: 14 }}> <Checkbox {...label} defaultChecked /> Show this email on the order tracking page (see below)</p>
                                </div>
                            </div>
                        </div>
                        <div className='setting-email'>
                            <div className='setting-name'>
                                <p style={{ fontSize: 16, fontWeight: "bold" }}>Your store’s customer service phone number</p>
                                <div className='setting-input'>
                                    <input data-v-537602ec="" placeholder="" name="pslipPhone" id="packing-slip-phone-input" autocomplete="on" aria-label="" aria-describedby="packing-slip-phone-input-help packing-slip-phone-input-error" step="1" type="regex" class="pf-form-control pf-ui-body" aria-required="false" aria-invalid="false" />
                                </div>
                            </div>
                        </div>
                        <div className='setting-email'>
                            <div className='setting-name'>
                                <p style={{ fontSize: 16, fontWeight: "bold" }}>Custom packing slip message</p>
                                <div className='setting-input'>
                                    <div className='setting-radio'>

                                        <p style={{ fontSize: 14 }}><Radio
                                            checked={selectedValue === 'a'}
                                            onChange={handleChange}
                                            value="a"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'A' }}
                                        />Personalized message</p>
                                        <p style={{ fontSize: 14 }}><Radio
                                            checked={selectedValue === 'b'}
                                            onChange={handleChange}
                                            value="b"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'B' }}
                                        />Sustainability message</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='setting-email'>
                            <div className='setting-name'>
                                <div className='setting-input'>
                                    <p style={{ fontSize: 14 }}>You can say thanks, give a discount code, or encourage sharing on social media</p>
                                    <div className='settting-textarea'>
                                        <textarea placeholder="" name="message" id="packing-slip-personalized-message-textarea" class="pf-form-textarea pf-form-control " aria-required="false" aria-invalid="false" style={{ overflow: "hidden", position: "relative", height: 187 }}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='setting-btn'>
                            <Button className="download-btn" variant="contained" color="primary">
                                Save
                            </Button>
                        </div>
                    </div>
                    <div className='setting-empty'></div>
                </div>

                <div className='setting-label'>
                    <p style={{ fontSize: 16, fontWeight: "bold" }}>Order tracking page</p>
                </div>
                <hr />
                <div className='setting-contain'>
                    <div className='setting-text'>
                        <p style={{ fontSize: 16 }}>Customize your store’s order tracking page  with optional features like a color logo, store’s contact email, social media accounts, and call-to-action buttons. You can also adjust the page’s language settings.</p>
                        <p style={{ fontSize: 16 }}>Even if you don’t personalize the tracking page, there won’t be any Printful branding.</p>
                    </div>
                    <div className='setting-empty'></div>
                </div>

                <div className='setting-contain'>
                    <div className='setting-text'>
                        <p style={{ fontSize: 16, fontWeight: "bold" }}>Logo</p>
                        <span>
                            <a href="javascript:" class="pf-btn pf-btn-secondary">Select image to Upload</a>
                            <input accept=".png,.jpg" type="file" name="file" class="hidden" />
                        </span>
                        <div className='setting-des'>
                            <p style={{ fontSize: 14 }}>Add a color logo with a minimum size of 800 × 500 px that will be displayed in the upper right corner of your order tracking page</p>
                        </div>
                        <div className='setting-email'>
                            <div className='setting-name'>
                                <p style={{ fontSize: 16, fontWeight: "bold" }}>Your store’s customer service email</p>
                                <div className='setting-input'>
                                    <input data-v-537602ec="" placeholder="name@printful.com" name="trackingPageEmail" readonly="readonly" id="tracking-page-email-input" autocomplete="on" aria-label="" aria-describedby="tracking-page-email-input-help tracking-page-email-input-error" step="1" type="email" class="pf-form-control pf-ui-body" aria-required="false" aria-invalid="false" />
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className='setting-empty'></div>
                </div>
                <div className='setting-contain'>
                    <div className='setting-text'>
                        <p style={{ fontSize: 16, fontWeight: "bold" }}>Social media accounts</p>
                        <div className='setting-email'>
                            <div className='setting-name'>
                                <p style={{ fontSize: 16, fontWeight: "bold" }}>Instagram</p>
                                <div className='setting-input'>
                                    <input data-v-537602ec="" placeholder="https://www.instagram.com/printful" name="trackingPageUrlInstagram" id="url-Instagram" autocomplete="on" aria-label="" aria-describedby="url-Instagram-help url-Instagram-error" step="1" type="text" class="pf-form-control pf-ui-body" aria-required="false" aria-invalid="false" />
                                </div>
                            </div>
                        </div>
                        <div className='setting-email'>
                            <div className='setting-name'>
                                <p style={{ fontSize: 16, fontWeight: "bold" }}>Facebook</p>
                                <div className='setting-input'>
                                    <input data-v-537602ec="" placeholder="https://www.facebook.com/printful" name="trackingPageUrlFacebook" id="url-Facebook" autocomplete="on" aria-label="" aria-describedby="url-Facebook-help url-Facebook-error" step="1" type="text" class="pf-form-control pf-ui-body" aria-required="false" aria-invalid="false" />
                                </div>
                            </div>
                        </div>
                        <div className='setting-email'>
                            <div className='setting-name'>
                                <p style={{ fontSize: 16, fontWeight: "bold" }}>X</p>
                                <div className='setting-input'>
                                    <input data-v-537602ec="" placeholder="https://twitter.com/printful" name="trackingPageUrlTwitter" id="url-Twitter" autocomplete="on" aria-label="" aria-describedby="url-Twitter-help url-Twitter-error" step="1" type="text" class="pf-form-control pf-ui-body" aria-required="false" aria-invalid="false" />
                                </div>
                            </div>
                        </div>
                        <div className='setting-email'>
                            <div className='setting-name'>
                                <p style={{ fontSize: 16, fontWeight: "bold" }}>Youtube</p>
                                <div className='setting-input'>
                                    <input data-v-537602ec="" placeholder="https://www.youtube.com/channel/UCnzsJ4W…" name="trackingPageUrlYoutube" id="url-Youtube" autocomplete="on" aria-label="" aria-describedby="url-Youtube-help url-Youtube-error" step="1" type="text" class="pf-form-control pf-ui-body" aria-required="false" aria-invalid="false" />
                                </div>
                            </div>
                        </div>
                        <div className='setting-email'>
                            <div className='setting-name'>
                                <p style={{ fontSize: 16, fontWeight: "bold" }}>Pinterest</p>
                                <div className='setting-input'>
                                    <input data-v-537602ec="" placeholder="https://www.pinterest.com/printful" name="trackingPageUrlPinterest" id="url-Pinterest" autocomplete="on" aria-label="" aria-describedby="url-Pinterest-help url-Pinterest-error" step="1" type="text" class="pf-form-control pf-ui-body" aria-required="false" aria-invalid="false" />
                                </div>
                            </div>
                        </div>
                        <div className='setting-email'>
                            <div className='setting-name'>
                                <p style={{ fontSize: 16, fontWeight: "bold" }}>Tiktok</p>
                                <div className='setting-input'>
                                    <input data-v-537602ec="" placeholder="https://www.tiktok.com/@printful" name="trackingPageUrlTikTok" id="url-TikTok" autocomplete="on" aria-label="" aria-describedby="url-TikTok-help url-TikTok-error" step="1" type="text" class="pf-form-control pf-ui-body" aria-required="false" aria-invalid="false" />
                                </div>
                            </div>
                        </div>
                        <div className='setting-email'>
                            <div className='setting-name'>
                                <p style={{ fontSize: 16, fontWeight: "bold" }}>Snapchat</p>
                                <div className='setting-input'>
                                    <input data-v-537602ec="" placeholder="https://www.snapchat.com/add/printful" name="trackingPageUrlSnapchat" id="url-Snapchat" autocomplete="on" aria-label="" aria-describedby="url-Snapchat-help url-Snapchat-error" step="1" type="text" class="pf-form-control pf-ui-body" aria-required="false" aria-invalid="false" />
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className='setting-empty'></div>
                </div>

                <div className='setting-contain'>
                    <div className='setting-text'>
                        <p style={{ fontSize: 16, fontWeight: "bold" }}>Custom call-to-action (CTA) button</p>
                        <div className='setting-email'>
                            <div className='setting-name'>
                                <p style={{ fontSize: 16, fontWeight: "bold" }}>Link</p>
                                <div className='setting-des'>
                                    <p style={{ fontSize: 14 }}>Link the page you want your customer to visit (your store’s homepage, customer service, etc.)</p>
                                </div>
                                <div className='setting-input'>
                                    <input data-v-537602ec="" placeholder="https://printful.com/" name="trackingPageUrlCta0" id="tracking-page-cta-link-input-0" autocomplete="on" aria-label="" aria-describedby="tracking-page-cta-link-input-desc-0" step="1" type="text" class="pf-form-control pf-ui-body" aria-required="false" aria-invalid="false" />
                                </div>
                            </div>
                            <div className='setting-name'>
                                <p style={{ fontSize: 16, fontWeight: "bold" }}>Button text</p>
                                <div className='setting-des'>
                                    <p style={{ fontSize: 14 }}>What the button will say (Click here, Go to store, Contact me, etc.)</p>
                                </div>
                                <div className='setting-input'>
                                    <input data-v-537602ec="" placeholder="Go to store" name="trackingPageTextCta0" id="tracking-page-cta-text-input-0" autocomplete="on" aria-label="" aria-describedby="tracking-page-cta-text-input-desc-0" step="1" type="text" class="pf-form-control pf-ui-body" aria-required="false" aria-invalid="false" />
                                </div>
                                <div className='setting-ctc'>
                                    <Link style={{ listStyle: "none", fontSize: 15 }}>+ Add another CTA button</Link>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className='setting-empty'></div>
                </div>

                <div className='setting-contain'>
                    <div className='setting-text'>
                        <div className='setting-email'>
                            <div className='setting-name'>
                                <p style={{ fontSize: 16, fontWeight: "bold" }}>Your store’s customer service email</p>
                                <div className='setting-checkbox'>
                                    <p style={{ fontSize: 14 }}>The order tracking page supports the languages listed below. By default, the tracking page auto-detects a customer’s browsing language. If it’s not supported, the page is shown in English.</p>
                                </div>
                                <div className='setting-checkbox'>
                                    <p style={{ fontSize: 14 }}>If you want the order tracking page to open in a specific language, regardless of your customer’s browsing preferences, uncheck this box and select the language below.</p>
                                </div>
                                <div className='setting-checkbox'>
                                    <p style={{ fontSize: 16 }}> <Checkbox {...label} /> Automatically detect language and use English as backup</p>
                                </div>
                                <div className='setting-checkbox'>
                                    <p style={{ fontSize: 14 }}>Select a language for your order tracking page upon opening:</p>
                                </div>
                                <div className='setting-email'>
                                    <div className='setting-name'>
                                        <p style={{ fontSize: 16, fontWeight: "bold" }}>Custom packing slip message</p>
                                        <div className='setting-input'>
                                            <div className='setting-radio'>
                                                <p style={{ fontSize: 14 }}><Radio
                                                    checked={selectedValue === 'a'}
                                                    onChange={handleChange}
                                                    value="a"
                                                    name="radio-buttons"
                                                    inputProps={{ 'aria-label': 'A' }}
                                                />English</p>
                                            </div>
                                        </div>
                                        <div className='setting-btn'>
                                            <Button className="download-btn"
                                                variant="contained"
                                                color="primary">Save</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='setting-empty'></div>
                </div>
            </div>
        </>
    )
}

export default SettingDigitalService