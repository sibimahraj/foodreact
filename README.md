import "./thank-you.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import lottieSrc from "../../../assets/_json/lottie/thankyou_animation.json";
import { KeyWithAnyModel } from "../../../utils/model/common-model";
const ThankYouBanner = (props: KeyWithAnyModel) => {
  return (
    <div className="thankyou__banner">
      <div className="thankyou__banner__left">
        <div className="lottieAnime_success">
          <Player src={lottieSrc} className="player" loop autoplay />
        </div>
        <label>{props.banner_header}</label>
        {props.banner_content && (
          <div className="body__app-desc">
            {props.banner_body_1}
            {props.productName} {props.banner_body_2}
            {props.resumeUrl && (
              <div className="body__app__btn">
                <a rel="noreferrer" href={process.env.REACT_APP_RESUME_URL}>
                  {props.resumeUrl}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThankYouBanner;





import {Provider} from 'react-redux'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import storeMockData from './../../../utils/mock/store-spec.json';
import ThankYou from '../thank-you/thank-you';

jest.autoMockOff();
jest.mock("axios", () => ({
  __esModule: true,
}));
jest.mock("@lottiefiles/react-lottie-player", () => ({
  __esModule: true,
}));

const mockStore = configureMockStore([thunk]);
let wrapper:any;
let store: any;
beforeEach(() => {
    store = mockStore(storeMockData);
    wrapper = shallow(
        <Provider store={store}>
          <ThankYou />
        </Provider>
      );
  });


describe('Thank you screen', () => {
  it('should render thank you component', () => {
    expect(wrapper.find('.thankyou').length).toEqual(0)
  })
})
