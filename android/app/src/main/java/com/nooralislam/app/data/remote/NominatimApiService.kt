package com.nooralislam.app.data.remote

import com.nooralislam.app.data.remote.dto.NominatimReverseResponse
import retrofit2.http.GET
import retrofit2.http.Query

interface NominatimApiService {
    @GET("reverse")
    suspend fun reverseGeocode(
        @Query("format") format: String = "json",
        @Query("lat") lat: Double,
        @Query("lon") lon: Double,
        @Query("zoom") zoom: Int = 18,
        @Query("addressdetails") addressDetails: Int = 1
    ): NominatimReverseResponse
}
