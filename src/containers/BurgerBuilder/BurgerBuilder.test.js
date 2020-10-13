import { BurgerBuilder } from './BurgerBuilder';
import { configure, shallow } from 'enzyme';
import { Adapter } from 'enzyme-adapter-react-16';
import BuildControls from "../../components/Burger/BuildControls/BuildControls"

configure({adapter: new Adapter()});

describe('Burger Builder', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />)
    });

    it('should render build controls', () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls).toHaveLength(1));
    });
});
