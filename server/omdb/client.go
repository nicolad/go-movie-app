package omdb

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"

	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
)

var Host = "www.omdbapi.com"

type Movie struct {
	ID    string `json:"imdbID"`
	Title string `json:"Title"`
	Year  string `json:"Year"`
	Error string
}

func Search(term string) ([]*Movie, error) {
	err := godotenv.Load()
	if err != nil {
	  log.Fatal("Error loading .env file")
	}
  
	APIKey := os.Getenv("API_KEY")

	fmt.Print(APIKey)
	
	q := url.Values{}
	q.Add("apikey", APIKey)
	q.Add("s", term)
	u := &url.URL{
		Scheme:   "http",
		Host:     Host,
		RawQuery: q.Encode(),
	}

	res, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	var jsonRes struct {
		Search []*Movie
	}

	decoder := json.NewDecoder(res.Body)
	if err = decoder.Decode(&jsonRes); err != nil {
		return nil, err
	}

	return jsonRes.Search, nil
}

func Get(id string) (*Movie, error) {
	err := godotenv.Load()
	if err != nil {
	  log.Fatal("Error loading .env file")
	}
  
	APIKey := os.Getenv("API_KEY")
	q := url.Values{}
	q.Add("apikey", APIKey)
	q.Add("i", id)
	u := &url.URL{
		Scheme:   "http",
		Host:     Host,
		RawQuery: q.Encode(),
	}

	res, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}

	b, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	var checkRes struct{ Error string }
	if err := json.Unmarshal(b, &checkRes); err != nil {
		return nil, err
	}
	if checkRes.Error != "" {
		return nil, nil
	}

	var jsonRes Movie
	if err = json.Unmarshal(b, &jsonRes); err != nil {
		return nil, err
	}

	return &jsonRes, nil
}

func GetAll(ids []string) ([]Movie, error) {
	var movies []Movie
	for i := range ids {
		m, err := Get(ids[i])
		if err != nil {
			return []Movie{}, err
		}
		if m != nil {
			movies = append(movies, *m)
		}
	}
	return movies, nil
}