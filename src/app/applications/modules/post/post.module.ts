import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ListPostComponent } from './pages/list-post/list-post.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  declarations: [ListPostComponent, CreatePostComponent, ViewPostComponent],
  imports: [RouterModule, ReactiveFormsModule, PostRoutingModule],
  // Remove the exports after adding the routes
  exports: [ListPostComponent, CreatePostComponent, ViewPostComponent],
})
export class PostModule {}
