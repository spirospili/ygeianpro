@extends('admin.app')

@section('content')
 
<div class="row mb-4">
    <div class="col-sm-12">
        <form method="GET">
            <input type="hidden" name="action" value="{{request()->action}}" />
            <div class="input-group">
                <input type="text" class="input-sm form-control" name="keywords" placeholder="Search" value="{{ request()->keywords }}">
                <span class="input-group-btn">
                    <input class="btn btn btn-primary" type="submit" value="Go!">
                </span>
            </div>
        </form>
    </div>
</div>
<div class="row">
    <div class="col-md-12 text-right mb-4">
        <a href="{{ route('admin.event.create') }}" class="btn btn-primary">Create Event</a>
    </div>
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
            <div class="table-responsive">
                @if($events->isNotEmpty())
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($events as $event)
                        <tr>
                            <td>{{$event->id}}</td>
                            <td>{{ $event->name }}</td>
                            <td>{{ $event->description }}</td>
                            <td>{{ $event->image }}</td>
                            <td>{{ $event->start_date }}</td>
                            <td>{{ $event->end_date }}</td>
                            <td>{{ $event->location }}</td>
                            <td>
                                <a href="{{ route('admin.event.edit', $event->id) }}">
                                    Edit
                                </a>
                                |
                                <a  href="{{ route('admin.event.destroy', $event->id) }}"
                                    onclick="event.preventDefault();
                                        document.getElementById('destroy-form{{$event->id}}').submit();">
                                    Delete
                                </a>

                                <form id="destroy-form{{$event->id}}" action="{{ route('admin.event.destroy', $event->id) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                    <input type="hidden" name="_method" value="DELETE" /> 
                                </form>
                            </td>
                        </tr>
                        @endforeach
                      </tbody>
                    </table>
                    @else
                    <p class="text-center">No Publications</p>
                    @endif
                  </div>
            </div>
        </div>
    </div>    
</div>
					
@endsection