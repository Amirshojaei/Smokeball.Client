import React, { useState } from 'react';
import { API } from './API';
import './styles.css';

const SearchComponent: React.FC = () => {
    const [keyword, setKeyword] = useState('');
    const [url, setUrl] = useState('');
    const [isKeywordValid, setKeywordValidation] = useState(true);
    const [isUrlValid, setUrlValidation] = useState(true);
    const [result, setResult] = useState<string | null>(null);
    const [searching, setSearching] = useState(false);

    const search = async () => {
        const isKeywordValid = !!keyword;
        const isUrlValid = !!url;

        setKeywordValidation(isKeywordValid);
        setUrlValidation(isUrlValid);

        if (isKeywordValid && isUrlValid) {
            setSearching(true);
            try {

                const searchResult = await API.search(keyword, url);
                setSearching(false);
    
                    setResult(
                        searchResult.positions.length > 0
                            ? searchResult.positions.join()
                            : '0'
                    );
            }

            catch (error) {
                setSearching(false);
                setResult(error.message);
            }
        }
    };

    return (
        <div>
            <div className="main_box">
                <div className="form_row">
                    <label className="keyword_label">Keyword*:</label>
                    <div style={{ display: 'inline' }}>
                        <input
                            className="input"
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="keyword"
                        />
                        {!isKeywordValid && <div className="validation_error">This field is required</div>}
                    </div>
                </div>
                <div className="form_row">
                    <label className="url_label">URL*:</label>
                    <div style={{ display: 'inline' }}>
                        <input
                            className="input"
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="www.example.com"
                        />
                        {!isUrlValid && <div className="validation_error">This field is required</div>}
                    </div>
                </div>
                <div className="button_container">
                    <button
                        disabled={searching}
                        aria-readonly={searching}
                        className="button"
                        onClick={search}
                    >
                        {searching ? 'Searching' : 'Search'}
                    </button>
                </div>
                {!!result && (
                    <textarea
                        readOnly
                        className="result_pane"
                        id="resultPane"
                        value={result}
                    />
                )}
            </div>
        </div>
    );
};

export default SearchComponent;
