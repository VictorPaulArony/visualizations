package main

import (
	"log"
	"net/http"

	groupie_tracker "groupie_tracker/utils"
)

func main() {
	staticDir := "static"

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir(staticDir))))

	// Set up route handlers
	http.HandleFunc("/", groupie_tracker.ArtistPageHandler)
	http.HandleFunc("/locations/", groupie_tracker.MoreDetailsHandler)
	http.HandleFunc("/favicon.ico", groupie_tracker.FaviconHandler)

	log.Println("Server starting at http://localhost:1234")
	log.Fatal(http.ListenAndServe(":1234", nil))
}
