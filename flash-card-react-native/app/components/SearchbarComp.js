/**
 * Script contains the SearchBar Component.
 */
import React from 'react';
import { SearchBar } from 'react-native-elements';
import { colors } from '../utils/config';

class SearchBarComp extends React.Component {
    handleUpdateSearch = (search) => {
        this.props.setSearchQuery(search);
    };

    render() {
        const { searchQuery } = this.props;

        return (
            <SearchBar
                placeholder="Type Here..."
                onChangeText={this.handleUpdateSearch}
                value={searchQuery}
                inputStyle={{ backgroundColor: colors.backgroundColor('dark') }}
                containerStyle={{
                    width: '100%',
                    height: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.backgroundColor('dark'),
                }}
                inputContainerStyle={{
                    backgroundColor: colors.backgroundColor('dark'),
                }}
                placeholderTextColor={colors.gray}
            />
        );
    }
}

export default SearchBarComp;
