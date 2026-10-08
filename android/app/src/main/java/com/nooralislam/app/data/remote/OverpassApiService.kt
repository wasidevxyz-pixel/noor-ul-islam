package com.nooralislam.app.data.remote

import com.nooralislam.app.data.remote.dto.OverpassResponse
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

interface OverpassApiService {
    @FormUrlEncoded
    @POST("api/interpreter")
    suspend fun searchMosques(
        @Field("data") query: String
    ): OverpassResponse
}
