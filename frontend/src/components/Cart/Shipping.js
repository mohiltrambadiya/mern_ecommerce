import React, { Fragment, useState } from "react";
import {
  PinDrop,
  Home,
  LocationCity,
  Public,
  Phone,
  TransferWithinAStation,
} from "@material-ui/icons";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps.js";
import { saveShippingInfo } from "../../actions/cartAction";
import { useNavigate } from "react-router";

const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const alert = useAlert();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingInfo.address);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [city, setCity] = useState(shippingInfo.city);

  const shippingDetailSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length > 10 || phoneNo.length < 10) {
      alert.error("Phone no should be 10 digits.");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, pincode, phoneNo, country, state })
    );
    navigate(`/order/confirm`);
  };

  return (
    <Fragment>
      <MetaData title="shipping detail" />

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Detail</h2>

          <form
            encType="multipart/form-data"
            className="shippingForm"
            onSubmit={shippingDetailSubmit}
          >
            <div>
              <Home />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCity />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <PinDrop />
              <input
                type="number"
                placeholder="Pincode"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <div>
              <Phone />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div>
              <Public />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div>
                <TransferWithinAStation />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="Continue"
              disabled={state ? false : true}
              className="shippingBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
