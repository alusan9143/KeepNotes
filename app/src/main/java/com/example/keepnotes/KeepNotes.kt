package com.example.keepnotes

import android.annotation.SuppressLint
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material3.Card
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.example.keepnotes.ui.theme.Orange


@SuppressLint("RememberReturnType", "UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun KeepNotesCards() {
    val comments = listOf<String>(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Elit pellentesque habitant morbi tristique. Scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis. Vitae justo eget magna fermentum.",
        "Ultrices eros in cursus turpis. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Sed elementum tempus egestas sed sed risus pretium quam. Sagittis orci a scelerisque purus semper eget duis at tellus. In massa tempor nec feugiat. Dui nunc mattis enim ut tellus elementum sagittis vitae et. Porttitor leo a diam sollicitudin tempor id eu.",
        "Arcu felis bibendum ut tristique. Lobortis mattis aliquam faucibus purus in massa tempor nec.",
        "Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Vitae congue eu consequat ac felis donec et odio. Porttitor rhoncus dolor purus non enim praesent elementum facilisis.",
        "A lacus vestibulum sed arcu non odio euismod.",
        "Enim tortor at auctor urna nunc id cursus. Nunc congue nisi vitae suscipit tellus mauris a. Sollicitudin tempor id eu nisl. Nunc sed id semper risus in hendrerit gravida.",
        "Nam at lectus urna duis. Arcu non odio euismod lacinia at quis. Facilisi cras fermentum odio eu.",
        "At in tellus integer feugiat scelerisque varius morbi enim. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Et netus et malesuada fames ac turpis egestas sed tempus. Eu tincidunt tortor aliquam nulla",
        "Convallis aenean et tortor at risus viverra adipiscing. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum.",
        "Consectetur a erat nam at.",
        "Habitant morbi tristique senectus et. Viverra suspendisse potenti nullam ac tortor vitae.",
        "Quis blandit turpis cursus in hac habitasse platea dictumst. Bibendum at varius vel pharetra vel turpis nunc eget. Tincidunt eget nullam non nisi est sit. Magna fermentum iaculis eu non diam phasellus vestibulum lorem. Leo a diam sollicitudin tempor id eu."
    )
    val lazyListState = rememberLazyListState()
    var scrolled = 0f
    var previousOffset = 0

    Column {
        LazyColumn(
            state = lazyListState
        ) {
            item {
                Image(
                    painter = painterResource(id = R.drawable.portada),
                    contentDescription = "null",
                    modifier = Modifier
                        .fillMaxWidth()
                        .graphicsLayer {
                            scrolled += lazyListState.firstVisibleItemScrollOffset - previousOffset
                            translationY = scrolled * 0.5f
                            previousOffset = lazyListState.firstVisibleItemScrollOffset
                        },
                    contentScale = ContentScale.Crop
                )
            }
            items(comments) { comment ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(6.dp)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(Color(0xFFFFE89F))
                    ) {
                        Text(
                            text = comment,
                            modifier = Modifier.padding(6.dp)
                        )
                    }

                }
            }
        }
    }
}